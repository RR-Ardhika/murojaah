/* eslint-disable @typescript-eslint/typedef */
import { getContainerColor } from './Card';

describe('getContainerColor', () => {
  const testCases = [
    { duration: 2, expected: 'bg-custom-teal' },
    { duration: 5, expected: 'bg-yellow-400' },
    { duration: 10, expected: 'bg-amber-600' },
    { duration: 31, expected: 'bg-red-700' },
  ];

  testCases.forEach(({ duration, expected }) => {
    test(`returns ${expected} for duration ${duration}`, () => {
      expect(getContainerColor(duration)).toBe(expected);
    });
  });
});
