import { combineReducers } from 'redux';
import addEpisode from './addEpisode/reducer';

export default combineReducers({
  listPersons: addEpisode,
});
