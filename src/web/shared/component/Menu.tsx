'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  Bars3Icon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useRef, useState } from 'react';

import * as service from '@/api/module/history/service';
import Links from '@/web/shared/util/const';

export default function Component(): JSX.Element {
  const classNames: Record<string, string> = {
    menuItems:
      'w-52 origin-top-right rounded-xl border border-white/20 bg-teal-700 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0',
    menuItem:
      'group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 bg-teal-700 data-[focus]:bg-teal-800 text-white',
  };

  const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement | null>(null);
  const [isDropDBConfirmationVisible, setIsDropDBConfirmationVisible] = useState(false);

  // @ts-expect-error expected return value type
  async function doExport(): void {
    try {
      const blob: Blob = await service.Export();

      // Create a blob with the JSON data
      const url: string = URL.createObjectURL(blob);

      // Create a temporary link element
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = url;
      link.download = 'murojaah.json'; // Set the download file name
      document.body.appendChild(link);

      // Programmatically click the link to trigger the download
      link.click();

      // Clean up by removing the link and releasing the blob URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  }

  function doImport(): void {
    fileInputRef.current?.click();
  }

  function doDropDB(): void {
    if (!isDropDBConfirmationVisible) {
      setIsDropDBConfirmationVisible(true);
      setTimeout(() => {
        setIsDropDBConfirmationVisible(false);
      }, 2000);
      return;
    }

    service.DropDB();
    window.location.reload();
  }

  function handleImportedFile(event: React.ChangeEvent<HTMLInputElement>): void {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    const reader: FileReader = new FileReader();
    // @ts-expect-error expected return value type
    reader.onload = async (): void => {
      try {
        const jsonString: string = reader.result as string;
        const blob: Blob = new Blob([jsonString], { type: 'application/json' });
        await service.Import(blob);
        window.location.reload(); // TD-6 Implement proper success import notification
      } catch (err) {
        console.error('Import failed:', err);
      }
    };
    reader.readAsText(file);
  }

  return (
    <>
      <Menu>
        <MenuButton>
          <Bars3Icon className="size-6" />
        </MenuButton>

        <MenuItems anchor="bottom end" className={classNames.menuItems}>
          <MenuItem>
            <button className={classNames.menuItem} onClick={doExport}>
              <ArrowUpTrayIcon className="size-4 fill-white/50" />
              Export
            </button>
          </MenuItem>

          <MenuItem>
            <button className={classNames.menuItem} onClick={doImport}>
              <ArrowDownTrayIcon className="size-4 fill-white/50" />
              Import
            </button>
          </MenuItem>

          <div className="my-1 h-px bg-white/20" />

          <MenuItem>
            <button
              className={classNames.menuItem}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                doDropDB();
              }}
            >
              <ArchiveBoxXMarkIcon className="size-4 fill-white/50" />
              {!isDropDBConfirmationVisible ? 'Delete database' : 'Confirm?'}
            </button>
          </MenuItem>

          <div className="my-1 h-px bg-white/20" />

          <MenuItem>
            <a className={classNames.menuItem} href={Links.GitHub} target="_blank">
              <Image
                className="w-4 h-4"
                width={16}
                height={16}
                src="/github-mark-white.svg"
                alt="icon"
              />
              GitHub
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImportedFile}
      />
    </>
  );
}
