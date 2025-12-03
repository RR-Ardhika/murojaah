'use client';

import { Base } from '@/shared/component/Base';
import { useDataImportListener } from '@/shared/hook';

import { useCompactDateDataStore } from '../../store';
import { CompactDateView } from '../../component/View';

export const CompactDatePage = (): React.JSX.Element => {
  const { fetchData } = useCompactDateDataStore();

  // Auto-refresh data when import event is triggered
  useDataImportListener(fetchData);

  return (
    <Base module="activity" name="CompactDatePage">
      <CompactDateView />
    </Base>
  );
};
