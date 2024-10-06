'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/16/solid';
import { Export, Import } from '@/api/module/history/service';
import Links from '@/web/shared/util/const';

export default function Component(): JSX.Element {
  function doExport(): void {
    Export();
  }

  function doImport(): void {
    Import();
  }

  return (
    <Menu>
      <MenuButton>
        <Bars3Icon className="size-6" />
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl border border-white/20 bg-custom-teal p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-custom-teal data-[focus]:bg-teal-700 text-white"
            onClick={doExport}
          >
            <ArrowUpTrayIcon className="size-4 fill-white/50" />
            Export
          </button>
        </MenuItem>

        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-custom-teal data-[focus]:bg-teal-700 text-white"
            onClick={doImport}
          >
            <ArrowDownTrayIcon className="size-4 fill-white/50" />
            Import
          </button>
        </MenuItem>

        <div className="my-1 h-px bg-white/20" />

        <MenuItem>
          <a
            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-custom-teal data-[focus]:bg-teal-700 text-white"
            href={Links.GitHub}
            target="_blank"
          >
            <img className="w-4 h-4" src="/github-mark-white.svg" alt="icon" />
            GitHub
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
