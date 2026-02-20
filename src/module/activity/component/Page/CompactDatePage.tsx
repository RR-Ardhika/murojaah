'use client';

import { Base } from '@/shared/component/Base';

import { GoToDateButton } from '../../component/GoToDateButton';
import { CompactDateView } from '../../component/View';

export const CompactDatePage = (): React.JSX.Element => {
  return (
    <Base module="activity" name="CompactDatePage">
      <CompactDateView />
      <GoToDateButton />
    </Base>
  );
};
