'use client';

import { FC, MutableRefObject, Profiler, ReactNode, useRef, useEffect } from 'react';

enum LogRenderModules {
  Activity = 'activity',
  Counter = 'counter',
  History = 'history',
  Shared = 'shared',
  Stat = 'stat',
}

interface BaseComponentProps {
  module?: string;
  name: string;
  children: ReactNode;
}

// Activate only when needed
const LOG_RENDER: boolean = false;
const USE_PROFILER: boolean = false;

const profilerCallback = (
  id: string,
  phase: 'mount' | 'update' | 'nested-update',
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
): void => {
  console.log(
    `%c[Profiler] [id] ${id} [phase] ${phase} in [actualDuration] ${actualDuration} ms [baseDuration] ${baseDuration} ms [startTime] ${startTime} ms [commitTime] ${commitTime} ms`,
    'color: teal; font-weight: bold;'
  );
};

export const Base: FC<BaseComponentProps> = (p: BaseComponentProps) => {
  const renderCount: MutableRefObject<number> = useRef(0);
  const moduleName: string = `[module] ${p.module}`;
  const componentName: string = `[component] ${p.name}`;
  const name: string = p.module ? `${moduleName} ${componentName}` : componentName;

  useEffect(() => {
    if (
      LOG_RENDER &&
      process.env.NODE_ENV === 'development' &&
      Object.values(LogRenderModules).includes(p.module as LogRenderModules)
    ) {
      renderCount.current += 1;
      console.log(
        `%c[RenderTracker] ${name} rendered ${renderCount.current} time(s).`,
        'color: teal; font-weight: bold;'
      );
    }
  });

  if (USE_PROFILER)
    return (
      <Profiler id={p.module + '.' + p.name} onRender={profilerCallback}>
        {p.children}
      </Profiler>
    );

  return <>{p.children}</>;
};
