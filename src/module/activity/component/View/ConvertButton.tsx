'use client';

import { Dialog, Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import { AlertColor, AlertText } from '@/shared/entity';
import { useAlertStore } from '@/shared/store';

import { Activity, ActivityType } from '../../entity';
import { createJuzFromSurahs, getEligibleJuzConversions, JuzConversion } from '../../service';
import { useDataStore, useListSurahDataStore } from '../../store';

interface ConvertButtonProps {
  activities: Activity[];
}

const CLASS_NAMES: Record<string, string> = {
  button:
    'text-sm text-white border border-custom-teal px-2 py-1 rounded bg-custom-teal hover:bg-teal-700 hover:text-white transition-colors',
  menuItems:
    'absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-xl border border-custom-teal/30 bg-white shadow-lg focus:outline-none',
  menuItem:
    'block w-full text-left px-4 py-2 text-sm text-custom-teal hover:bg-custom-teal hover:text-white first:rounded-t-xl last:rounded-b-xl',
  cancelButton: 'px-4 py-2 text-sm bg-red-500 hover:bg-red-700 text-white',
  confirmButton: 'px-4 py-2 text-sm bg-custom-teal text-white rounded-lg hover:bg-custom-teal/80',
};

export const ConvertButton = ({ activities }: ConvertButtonProps): React.JSX.Element | null => {
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedJuz, setSelectedJuz] = useState<JuzConversion | null>(null);
  const { showAlert } = useAlertStore();
  const { fetchData } = useDataStore();
  const { fetchData: fetchListSurah } = useListSurahDataStore();

  const eligibleJuzs: JuzConversion[] = getEligibleJuzConversions(activities);

  if (eligibleJuzs.length === 0) return null;

  const getOccuredAtFromJuz = (juz: JuzConversion): Date => {
    const surahActivities: Activity[] = activities
      .filter(
        (a: Activity): boolean =>
          a.activityType === ActivityType.Surah &&
          a.surah !== undefined &&
          juz.surahIds.includes(a.surah)
      )
      .sort(
        (a: Activity, b: Activity): number =>
          new Date(b.occuredAt).getTime() - new Date(a.occuredAt).getTime()
      );
    return surahActivities[0]?.occuredAt ?? new Date();
  };

  const openConfirmDialog = (juz: JuzConversion): void => {
    setSelectedJuz(juz);
    setIsDialogOpen(true);
  };

  const handleConvert = async (): Promise<void> => {
    if (!selectedJuz) return;

    setIsConverting(true);
    setIsDialogOpen(false);
    try {
      const surahActivities: Activity[] = activities.filter(
        (a: Activity): boolean =>
          a.activityType === ActivityType.Surah &&
          a.surah !== undefined &&
          selectedJuz.surahIds.includes(a.surah)
      );
      const surahActivityIds: string[] = surahActivities.map((a: Activity): string => a.id);
      const occuredAt: Date = getOccuredAtFromJuz(selectedJuz);

      await createJuzFromSurahs(selectedJuz.juzId, occuredAt, 0, 1, surahActivityIds);
      await Promise.all([fetchData(), fetchListSurah()]);
      showAlert(AlertColor.Green, AlertText.SuccessConvertedToJuz);
    } catch (error) {
      console.error('Conversion failed:', error);
      showAlert(AlertColor.Red, AlertText.FailedConvertedToJuz);
    } finally {
      setIsConverting(false);
      setSelectedJuz(null);
    }
  };

  const renderConfirmDialog = (): React.JSX.Element => (
    <Transition appear show={isDialogOpen} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={(): void => setIsDialogOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-2">
                  Convert to Juz {selectedJuz?.juzId}?
                </Dialog.Title>
                <Dialog.Description className="text-sm text-gray-600 mb-4">
                  This will create a Juz {selectedJuz?.juzId} activity and delete{' '}
                  {selectedJuz?.surahIds.length} surah activities.
                </Dialog.Description>
                <div className="flex justify-end gap-2">
                  <button
                    className={CLASS_NAMES.cancelButton}
                    onClick={(): void => setIsDialogOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className={CLASS_NAMES.confirmButton} onClick={handleConvert}>
                    Convert
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  if (eligibleJuzs.length === 1) {
    return (
      <>
        <button
          className={CLASS_NAMES.button}
          onClick={(): void => openConfirmDialog(eligibleJuzs[0])}
          disabled={isConverting}
          aria-label={`Convert completed surahs to Juz ${eligibleJuzs[0].juzId}`}
        >
          {isConverting ? 'Converting...' : `Juz ${eligibleJuzs[0].juzId}`}
        </button>
        {renderConfirmDialog()}
      </>
    );
  }

  return (
    <>
      <Menu>
        <MenuButton
          className={CLASS_NAMES.button}
          disabled={isConverting}
          aria-label="Convert completed surahs to Juz"
        >
          {isConverting ? 'Converting...' : 'Convert'}
        </MenuButton>
        <MenuItems className={CLASS_NAMES.menuItems}>
          {eligibleJuzs.map(
            (juz: JuzConversion): React.JSX.Element => (
              <MenuItem key={juz.juzId}>
                <button
                  className={CLASS_NAMES.menuItem}
                  onClick={(): void => openConfirmDialog(juz)}
                >
                  Juz {juz.juzId}
                </button>
              </MenuItem>
            )
          )}
        </MenuItems>
      </Menu>
      {renderConfirmDialog()}
    </>
  );
};
