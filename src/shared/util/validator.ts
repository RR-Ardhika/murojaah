import { validate as validateUuid, version as uuidVersion } from 'uuid';

// @ts-expect-error known type param
// eslint-disable-next-line
export const findEmpty = (obj): boolean => {
  let found: boolean = false;

  for (const key in obj) {
    if (isEmpty(obj[key])) {
      console.error(`empty obj found in key ${key}`);
      found = true;
    }
  }

  return found;
};

// @ts-expect-error known type param
// eslint-disable-next-line
const isEmpty = (value): boolean => {
  if (value === undefined) return true;
  else if (value === null) return true;
  else if (value === '') return true;
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isValidUuid = (uuid: string): boolean => {
  return validateUuid(uuid) && uuidVersion(uuid) === 4;
};
