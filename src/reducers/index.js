import { combineReducers } from 'redux';
import animes from './animes_reducer';
import animeDetails from './animeDetails_reducer';

import currentAnimeDetails from './currentAnimeDetails';
import currentVideo from './currentVideo_reducer';
import episodes from './episodes_reducer';
import range from './range_reducer';
import server from './server_reducer';

import featuredAnimes from './featuredAnimes_reducer';
import genres from './genres_reducer';
import searchTerm from './searchTerm_reducer';
import suggestions from './suggestions_reducer';
import topAnimes from './topAnimes_reducer';
import totalPages from './totalPages_reducer';

import quickLists from './quickLists_reducer';
import selectedList from './selectedQuickList_reducer';

const rootReducer = combineReducers({
  animes,
  animeDetails,
  currentAnimeDetails,
  currentVideo,
  episodes,
  featuredAnimes,
  genres,
  quickLists,
  range,
  searchTerm,
  selectedList,
  server,
  suggestions,
  topAnimes,
  totalPages
});
export default rootReducer;
