import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './modules/rootReducers';

import { IEpisodeState } from './modules/addEpisode/types';

export interface IState {
  listPersons: IEpisodeState;
}

const store = createStore(rootReducers, composeWithDevTools());

export default store;
