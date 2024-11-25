import { FC, MutableRefObject, ReactNode, useRef, useEffect } from 'react';

const LOG_RENDER: boolean = false;

enum LogRenderModules {
  Activity = 'activity',
  History = 'history',
  Counter = 'counter',
  Stat = 'stat',
}

interface BaseComponentProps {
  module?: string;
  name: string;
  children: ReactNode;
}

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

  return <>{p.children}</>;
};
