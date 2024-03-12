const Stat = (): JSX.Element => {
  const classNames: Record<string, string> = {
    container: 'mt-[72px] pt-4 px-4',
    card: 'px-4 pt-4 bg-custom-teal text-white rounded-lg',
    title: 'text-xl font-black',
    dataContainer: 'grid grid-cols-3 grid-rows-3 gap-0',
    data: 'col-span-2',
  };

  return (
    <div className={classNames.container}>
      <div className={classNames.card}>
        <p className={classNames.title}>Daily</p>
        <div className={classNames.dataContainer}>
          <p>Total lines: </p>
          <p className={classNames.data}>100</p>
          <p>Total juz:</p>
          <p className={classNames.data}>1</p>
        </div>
      </div>
    </div>
  );
};

export default Stat;
