import { ILocation } from './types';

export function addLocationToCreateEpisode(location: ILocation | []) {
  return {
    type: 'ADD_LOCATION_TO_CREATE_EPISODE',
    payload: {
      location,
    },
  };
}

export function removeLocationToCreateEpisode(location: ILocation) {
  return {
    type: 'REMOVE_LOCATION_TO_CREATE_EPISODE',
    payload: {
      location,
    },
  };
}
