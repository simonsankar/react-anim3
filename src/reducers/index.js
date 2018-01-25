import { combineReducers } from 'redux';
import animes from './animes_reducer';
import animeDetails from './animeDetails_reducer';
import genres from './genres_reducer';
import selectedAnime from './selectedAnime_reducer';

const rootReducer = combineReducers({
  animes,
  animeDetails,
  selectedAnime,
  genres
});
export default rootReducer;
