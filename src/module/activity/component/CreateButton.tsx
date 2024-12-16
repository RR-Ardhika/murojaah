import { clsx } from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

import { Base } from '@/shared/component/Base';
import { Form } from '@/shared/component/Form';
import { useAlert } from '@/shared/context/AlertContext';

import { useData } from '../context/DataContext';

interface InternalProps {
  setFormType: Dispatch<SetStateAction<string>>;
  setIsSubButtonsVisible: Dispatch<SetStateAction<boolean>>;
  setIsFormVisible: Dispatch<SetStateAction<boolean>>;
  // @ts-expect-error useAlert
  hideAlert: Context<AlertContextValues>;
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

const showForm = (i: InternalProps, type: string): void => {
  i.hideAlert();
  i.setFormType(type);
  i.setIsFormVisible(true);
};

const renderSubButtons = (i: InternalProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      <button
        className={clsx(CLASS_NAMES.base, CLASS_NAMES.sub)}
        onClick={() => showForm(i, 'Juz')}
      >
        <span className="text-xl">Juz</span>
      </button>
      <button
        className={clsx(CLASS_NAMES.base, CLASS_NAMES.sub)}
        onClick={() => showForm(i, 'Ayah')}
      >
        <span className="text-xl">Ayah</span>
      </button>
      <button
        className={clsx(CLASS_NAMES.base, CLASS_NAMES.sub)}
        onClick={() => showForm(i, 'Surah')}
      >
        <span className="text-xl">Surah</span>
      </button>
    </div>
  );
};

export const CreateButton = (): JSX.Element => {
  const [formType, setFormType] = useState('');
  const [isSubButtonsVisible, setIsSubButtonsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { fetchData } = useData();
  const { hideAlert } = useAlert();

  const i: InternalProps = {
    setFormType,
    setIsSubButtonsVisible,
    setIsFormVisible,
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

          <Form
            formType={formType}
            isFormVisible={isFormVisible}
            setIsFormVisible={setIsFormVisible}
            setIsSubButtonsVisible={setIsSubButtonsVisible}
            fetchData={fetchData}
          />
        </div>
      </div>
    </Base>
  );
};
