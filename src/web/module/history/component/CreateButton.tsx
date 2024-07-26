import { useState } from 'react';
import { useData } from '@/web/module/history/context/DataContext';
import { useAlert } from '@/web/shared/context/AlertContext';
import { clsx } from 'clsx';
import Form from '@/web/shared/component/Form';

const CreateButton = (): JSX.Element => {
  const btnClass: Record<string, string> = {
    base: 'bg-white active:bg-teal-200 border-2 text-custom-teal border-custom-teal rounded-full',
    main: 'relative right-1 w-16 h-16',
    mainLeft: 'left-[7px]',
    sub: 'p-2',
  };

  const [formType, setFormType] = useState('');
  const [isSubButtonsVisible, setIsSubButtonsVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { fetchData } = useData();
  // @ts-expect-error useAlert
  const { hideAlert } = useAlert();

  function toggleShowSubButtons(): void {
    setIsSubButtonsVisible((isSubButtonsVisible: boolean) => !isSubButtonsVisible);
  }

  function showForm(type: string): void {
    hideAlert();
    setFormType(type);
    setIsFormVisible(true);
  }

  function renderSubButtons(): JSX.Element {
    return (
      <div className="flex flex-col gap-4">
        <button className={clsx(btnClass.base, btnClass.sub)} onClick={() => showForm('Juz')}>
          <span className="text-xl">Juz</span>
        </button>
        <button className={clsx(btnClass.base, btnClass.sub)} onClick={() => showForm('Ayah')}>
          <span className="text-xl">Ayah</span>
        </button>
        <button className={clsx(btnClass.base, btnClass.sub)} onClick={() => showForm('Surah')}>
          <span className="text-xl">Surah</span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-16 right-4">
      <div className="flex flex-col gap-4">
        {isSubButtonsVisible && renderSubButtons()}

        <button
          className={clsx(btnClass.base, btnClass.main, isSubButtonsVisible && btnClass.mainLeft)}
          onClick={() => toggleShowSubButtons()}
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
  );
};

export default CreateButton;
