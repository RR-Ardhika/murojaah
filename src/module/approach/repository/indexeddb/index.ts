import * as entity from '../../entity';

export const findApproachById = (id: number): entity.Approach => {
  // @ts-expect-error access enum value with index
  return entity.Approach[Object.keys(entity.Approach)[id]];
};
