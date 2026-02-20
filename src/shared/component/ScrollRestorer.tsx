'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { useScrollStore } from '@/shared/store';
import { getViewKey } from '@/shared/util/navigation';

export const ScrollRestorer = (): null => {
    const pathname: string = usePathname();
    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const { getScrollPosition } = useScrollStore();
    const previousViewKey: React.RefObject<string> = useRef<string>('');

    useEffect((): void => {
        const viewKey: string = getViewKey(pathname, searchParams);

        if (previousViewKey.current === viewKey) return;
        previousViewKey.current = viewKey;

        const savedPosition: number = getScrollPosition(viewKey);

        requestAnimationFrame((): void => {
            window.scrollTo(0, savedPosition);
        });
    }, [pathname, searchParams, getScrollPosition]);

    return null;
};
