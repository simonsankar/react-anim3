import { combineReducers } from 'redux';
import animes from './animes_reducer';
import animeDetails from './animeDetails_reducer';
import currentAnimeDetails from './currentAnimeDetails';
import currentVideo from './currentVideo_reducer';
import episodes from './episodes_reducer';
import featuredAnimes from './featuredAnimes_reducer';
import genres from './genres_reducer';
import range from './range_reducer';
import server from './server_reducer';

const rootReducer = combineReducers({
  animes,
  animeDetails,
  currentAnimeDetails,
  currentVideo,
  episodes,
  featuredAnimes,
  genres,
  range,
  server
});
export default rootReducer;
