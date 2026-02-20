'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useState } from 'react';

import { AlertColor, AlertText } from '@/shared/entity';
import { useAlertStore } from '@/shared/store';

import { Activity } from '../../entity';
import { createJuzFromSurahs, getEligibleJuzConversions, JuzConversion } from '../../service';
import { useDataStore, useListSurahDataStore } from '../../store';

interface ConvertButtonProps {
  activities: Activity[];
  occuredAt: Date;
}

const CLASS_NAMES: Record<string, string> = {
  button: 'text-sm text-custom-teal border border-custom-teal px-2 py-1 rounded hover:bg-custom-teal hover:text-white transition-colors',
  menuItems:
    'absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-xl border border-custom-teal/30 bg-white shadow-lg focus:outline-none',
  menuItem:
    'block w-full text-left px-4 py-2 text-sm text-custom-teal hover:bg-custom-teal hover:text-white first:rounded-t-xl last:rounded-b-xl',
};

export const ConvertButton = ({ activities, occuredAt }: ConvertButtonProps): React.JSX.Element | null => {
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const { showAlert } = useAlertStore();
  const { fetchData } = useDataStore();
  const { fetchData: fetchListSurah } = useListSurahDataStore();

  const eligibleJuzs: JuzConversion[] = getEligibleJuzConversions(activities);

  if (eligibleJuzs.length === 0) return null;

  const handleConvert = async (juzId: number): Promise<void> => {
    setIsConverting(true);
    try {
      await createJuzFromSurahs(juzId, occuredAt, 0, 1);
      await Promise.all([fetchData(), fetchListSurah()]);
      showAlert(AlertColor.Green, AlertText.SuccessConvertedToJuz);
    } catch (error) {
      console.error('Conversion failed:', error);
      showAlert(AlertColor.Red, AlertText.FailedConvertedToJuz);
    } finally {
      setIsConverting(false);
    }
  };

  if (eligibleJuzs.length === 1) {
    return (
      <button
        className={CLASS_NAMES.button}
        onClick={(): Promise<void> => handleConvert(eligibleJuzs[0].juzId)}
        disabled={isConverting}
        aria-label={`Convert completed surahs to Juz ${eligibleJuzs[0].juzId}`}
      >
        {isConverting ? 'Converting...' : `Juz ${eligibleJuzs[0].juzId}`}
      </button>
    );
  }

  return (
    <Menu>
      <MenuButton
        className={CLASS_NAMES.button}
        disabled={isConverting}
        aria-label="Convert completed surahs to Juz"
      >
        {isConverting ? 'Converting...' : 'Convert'}
      </MenuButton>
      <MenuItems className={CLASS_NAMES.menuItems}>
        {eligibleJuzs.map((juz: JuzConversion): React.JSX.Element => (
          <MenuItem key={juz.juzId}>
            <button
              className={CLASS_NAMES.menuItem}
              onClick={(): Promise<void> => handleConvert(juz.juzId)}
            >
              Juz {juz.juzId}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
