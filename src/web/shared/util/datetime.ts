import { DateTime } from 'luxon';

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
