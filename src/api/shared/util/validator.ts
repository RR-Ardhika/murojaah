// @ts-expect-error known type param
// eslint-disable-next-line
export function FindEmpty(obj): boolean {
  let found: boolean = false;

  for (const key in obj) {
    if (IsEmpty(obj[key])) {
      found = true;
      throw new Error(`empty obj found in key ${key}`);
    }
  }

  return found;
}

// @ts-expect-error known type param
// eslint-disable-next-line
export function IsEmpty(value): boolean {
  if (value === undefined) return true;
  else if (value === null) return true;
  else if (value === '') return true;
  return false;
}
