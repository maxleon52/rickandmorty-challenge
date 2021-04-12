import { Reducer } from 'redux';
import produce from 'immer';

import { IEpisodeState } from './types';

const INITIAL_STATE: IEpisodeState = {
  persons: [],
};

const addEpisode: Reducer<IEpisodeState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PERSON_TO_CREATE_EPISODE': {
      const { person } = action.payload;

      const existPerson = state.persons.findIndex(
        item => item.id === person.id,
      );

      if (existPerson === -1) {
        return produce(state, draft => {
          draft.persons.push({
            ...person,
          });
        });
      }
      return state;
    }
    case 'REMOVE_PERSON_TO_CREATE_EPISODE': {
      const { person } = action.payload;
      return produce(state, draft => {
        // eslint-disable-next-line no-param-reassign
        draft.persons = draft.persons.filter(item => item.id !== person.id);
      });
    }
    default: {
      return state;
    }
  }
};

export default addEpisode;
