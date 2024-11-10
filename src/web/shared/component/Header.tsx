import Menu from '@/web/shared/component/Menu';

const Header = (): JSX.Element => {
  return (
    <header className="fixed w-full p-4 bg-custom-teal text-4xl text-white border-b border-b-white">
      <div className="flex justify-between">
        <p>Murojaah</p>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
