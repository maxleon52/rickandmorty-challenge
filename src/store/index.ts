import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './modules/rootReducers';

import { IEpisodeState } from './modules/addEpisode/types';
import { IEpisodeStateLocation } from './modules/addLocation/types';

export interface IState {
  listPersons: IEpisodeState;
  listLocations: IEpisodeStateLocation;
}

const store = createStore(rootReducers, composeWithDevTools());

export default store;
