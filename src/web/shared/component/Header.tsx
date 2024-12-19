import { Base } from '@/web/shared/component/Base';
import { Menu } from '@/web/shared/component/Menu';

export const Header = (): JSX.Element => {
  return (
    <Base module="shared" name="Header">
      <header className="fixed w-full p-4 bg-custom-teal text-4xl text-white border-b border-b-white">
        <div className="flex justify-between">
          <p>Murojaah</p>
          <Menu />
        </div>
      </header>
    </Base>
  );
};
