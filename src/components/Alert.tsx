import { useAlert } from '@/context/AlertContext';

export const Alert = (): JSX.Element => {
  const { isAlertVisible } = useAlert();

  if (!isAlertVisible) return <></>;

  return (
    <div className="fixed w-full mt-[72px] p-2 bg-green-500 text-white text">
      <div className="flex justify-between">
        <p>Successfully created new murojaah</p>
      </div>
    </div>
  );
};
