'use client';

import { useRef } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, ArrowUpTrayIcon, ArrowDownTrayIcon } from '@heroicons/react/16/solid';
import { Export, Import } from '@/api/module/history/service';
import Links from '@/web/shared/util/const';

export default function Component(): JSX.Element {
  const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement | null>(null);

  // @ts-expect-error expected return value type
  async function doExport(): void {
    try {
      const jsonString: string = await Export();

      // Create a blob with the JSON data
      const blob: Blob = new Blob([jsonString], { type: 'application/json' });
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

  async function handleImportedFile(event: React.ChangeEvent<HTMLInputElement>): Promise<void> {
    const file: File | undefined = event.target.files?.[0];
    if (!file) return;

    const reader: FileReader = new FileReader();
    // @ts-expect-error expected return value type
    reader.onload = async (): void => {
      try {
        const jsonString: string = reader.result as string;
        await Import(jsonString);
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
