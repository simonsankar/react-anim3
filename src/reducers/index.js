import { combineReducers } from 'redux';
import animes from './animes_reducer';
import animeDetails from './animeDetails_reducer';
import genres from './genres_reducer';

const rootReducer = combineReducers({
  animes,
  animeDetails,
  genres
});
export default rootReducer;
