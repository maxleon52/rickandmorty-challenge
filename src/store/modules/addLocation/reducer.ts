import { Reducer } from 'redux';
import produce from 'immer';

import { IEpisodeStateLocation } from './types';

const INITIAL_STATE: IEpisodeStateLocation = {
  locations: [],
};

const addEpisode: Reducer<IEpisodeStateLocation> = (
  state = INITIAL_STATE,
  action,
) => {
  switch (action.type) {
    case 'ADD_LOCATION_TO_CREATE_EPISODE': {
      const { location } = action.payload;

      const existLocation = state.locations.findIndex(
        item => item.id === location.id,
      );

      if (existLocation === -1) {
        return produce(state, draft => {
          draft.locations.push({
            ...location,
          });
        });
      }
      return state;
    }
    case 'REMOVE_LOCATION_TO_CREATE_EPISODE': {
      const { location } = action.payload;
      return produce(state, draft => {
        // eslint-disable-next-line no-param-reassign
        draft.locations = draft.locations.filter(
          item => item.id !== location.id,
        );
      });
    }
    default: {
      return state;
    }
  }
};

export default addEpisode;
