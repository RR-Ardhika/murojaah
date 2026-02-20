export const findNearestId = (targetId: string, availableIds: string[]): string => {
  const sortedIds: string[] = [...availableIds].sort();
  return sortedIds.reduce((prev: string, curr: string): string => {
    const prevDiff: number = Math.abs(new Date(prev).getTime() - new Date(targetId).getTime());
    const currDiff: number = Math.abs(new Date(curr).getTime() - new Date(targetId).getTime());
    return currDiff < prevDiff ? curr : prev;
  });
};

export const scrollToElement = (elementId: string): (() => void) => {
  const element: HTMLElement | null = document.getElementById(elementId);
  if (!element) return (): void => {};

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  element.classList.add('flash-highlight');

  const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
    element.classList.remove('flash-highlight');
  }, 5000);

  return (): void => {
    clearTimeout(timeoutId);
    element.classList.remove('flash-highlight');
  };
};
