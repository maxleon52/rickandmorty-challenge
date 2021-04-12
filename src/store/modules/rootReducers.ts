import { combineReducers } from 'redux';
import addEpisode from './addEpisode/reducer';
import addLocation from './addLocation/reducer';

export default combineReducers({
  listPersons: addEpisode,
  listLocations: addLocation,
});
