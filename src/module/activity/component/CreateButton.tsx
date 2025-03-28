import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import { Base } from '@/shared/component/Base';
import { useAlertStore } from '@/shared/store';

import { ActivityType } from '../entity';
import { useFormStore } from '../store';

interface InternalProps {
  setIsSubButtonsVisible: Dispatch<SetStateAction<boolean>>;
  setIsFormVisible: (value: boolean) => void;
  setFormType: (value: number) => void;
  hideAlert: () => void;
}

const CLASS_NAMES: Record<string, string> = {
  base: 'bg-white active:bg-teal-200 border-2 text-custom-teal border-custom-teal rounded-full',
  main: 'relative right-1 w-16 h-16',
  mainLeft: 'left-[7px]',
  sub: 'p-2',
};

const toggleShowSubButtons = (i: InternalProps): void => {
  i.setIsSubButtonsVisible((isSubButtonsVisible: boolean) => !isSubButtonsVisible);
};

const showForm = (i: InternalProps, type: number): void => {
  i.hideAlert();
  i.setFormType(type);
  i.setIsSubButtonsVisible(false);
  i.setIsFormVisible(true);
};

const renderSubButtons = (i: InternalProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <button
        className={clsx(CLASS_NAMES.base, CLASS_NAMES.sub)}
        onClick={() => showForm(i, ActivityType.Juz)}
      >
        <span className="text-xl">Juz</span>
      </button>
      <button
        className={clsx(CLASS_NAMES.base, CLASS_NAMES.sub)}
        onClick={() => showForm(i, ActivityType.Ayah)}
      >
        <span className="text-xl">Ayah</span>
      </button>
      <button
        className={clsx(CLASS_NAMES.base, CLASS_NAMES.sub)}
        onClick={() => showForm(i, ActivityType.Surah)}
      >
        <span className="text-xl">Surah</span>
      </button>
    </div>
  );
};

export const CreateButton = (): React.JSX.Element => {
  const [isSubButtonsVisible, setIsSubButtonsVisible] = useState(false);

  const { hideAlert } = useAlertStore();

  const { setIsFormVisible, setFormType } = useFormStore();

  const i: InternalProps = {
    setIsSubButtonsVisible,
    setIsFormVisible,
    setFormType,
    hideAlert,
  };

  return (
    <Base module="activity" name="CreateButton">
      <div className="fixed bottom-16 right-4">
        <div className="flex flex-col gap-4">
          {isSubButtonsVisible && renderSubButtons(i)}

          <button
            className={clsx(
              CLASS_NAMES.base,
              CLASS_NAMES.main,
              isSubButtonsVisible && CLASS_NAMES.mainLeft
            )}
            onClick={() => toggleShowSubButtons(i)}
          >
            <span className="relative bottom-1 text-6xl font-extralight">+</span>
          </button>
        </div>
      </div>
    </Base>
  );
};
