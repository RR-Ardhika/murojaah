import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/16/solid';

export default function Component(): JSX.Element {
  return (
    <Menu>
      <MenuButton>
        <Bars3Icon className="size-6" />
      </MenuButton>

      <MenuItems anchor="bottom end" className="w-52">
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-custom-teal text-white">
            <ArrowUpTrayIcon className="size-4 fill-white/50" />
            Export
          </button>
        </MenuItem>

        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-custom-teal text-white">
            <ArrowDownTrayIcon className="size-4 fill-white/50" />
            Import
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
