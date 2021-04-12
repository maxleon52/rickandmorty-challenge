import { IPerson } from './types';

export function addPersonToCreateEpisode(person: IPerson) {
  return {
    type: 'ADD_PERSON_TO_CREATE_EPISODE',
    payload: {
      person,
    },
  };
}

export function removePersonToCreateEpisode(person: IPerson) {
  return {
    type: 'REMOVE_PERSON_TO_CREATE_EPISODE',
    payload: {
      person,
    },
  };
}
