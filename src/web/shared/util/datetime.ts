import { DateTime, Duration } from 'luxon';
import humanizeDuration from 'humanize-duration';

export const formFormatDatetimes: string[] = ['yyyy-MM-dd HH:mm', 'yyyy-MM-dd HH.mm'];

export function formatDatetime(date: Date): string {
  const parsedTime: DateTime = DateTime.fromJSDate(date);
  if (!parsedTime.isValid) return '';
  const front: string = parsedTime.toFormat('EEE, MMM dd ');
  const back: string = parsedTime.toFormat('yy hh:mm a');
  return front + "'" + back;
}

export function formatDate(date: Date): string {
  const parsedTime: DateTime = DateTime.fromJSDate(date);
  if (!parsedTime.isValid) return '';
  const front: string = parsedTime.toFormat('EEE, MMM dd ');
  const back: string = parsedTime.toFormat('yy');
  return front + "'" + back;
}

export function getDurationFromNow(date: Date): number {
  const now: DateTime = DateTime.now();
  const parsedDate: DateTime = DateTime.fromJSDate(date);
  const duration: Duration = now.diff(parsedDate);
  return Math.round(duration.as('days'));
}

export function formatDurationFromNow(date: Date): string {
  const now: DateTime = DateTime.now();
  const parsedDate: DateTime = DateTime.fromJSDate(date);
  return humanizeDurationShort(now.diff(parsedDate));
}

function humanizeDurationShort(duration: Duration): string {
  // eslint-disable-next-line @typescript-eslint/typedef
  const shortEnglishHumanizer = humanizeDuration.humanizer({
    language: 'shortEn',
    languages: {
      shortEn: {
        y: () => 'y',
        mo: () => 'mo',
        w: () => 'w',
        d: () => 'd',
        h: () => 'h',
        m: () => 'm',
        s: () => 's',
        ms: () => 'ms',
      },
    },
    unitMeasures: {
      y: 31557600000,
      mo: 30 * 86400000,
      w: 604800000,
      d: 86400000,
      h: 3600000,
      m: 60000,
      s: 1000,
      ms: 1,
    },
    largest: 1,
  });

  // @ts-expect-error known type
  return shortEnglishHumanizer(duration, { round: true, spacer: '', delimiter: ' ' });
}
