import { useEffect } from 'react';

/**
 * Custom hook to listen for data import events and trigger a refresh callback
 * Used across multiple components to sync data after import without page reload
 *
 * @param onDataImported - Callback function to execute when data is imported
 */
export const useDataImportListener = (onDataImported: () => void): void => {
  useEffect(() => {
    const handleDataImported = (): void => {
      onDataImported();
    };

    window.addEventListener('data-imported', handleDataImported);

    return (): void => {
      window.removeEventListener('data-imported', handleDataImported);
    };
  }, [onDataImported]);
};
