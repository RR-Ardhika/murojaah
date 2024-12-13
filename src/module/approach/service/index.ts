import * as entity from '../entity';
import * as repo from '../repository/indexeddb';

export const show = (id: number): entity.Approach => {
  return repo.findApproachById(id);
};
