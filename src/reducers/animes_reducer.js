import {
  GET_UPDATED_ANIMES,
  GET_NEWEST_ANIMES,
  GET_GENRE_ANIMES,
  RESET_ANIMES
} from '../actions/types';

const animes = (state = null, action) => {
  switch (action.type) {
    case GET_NEWEST_ANIMES:
    case GET_GENRE_ANIMES:
    case GET_UPDATED_ANIMES:
      console.log('Updated animes reducer', action.payload);
      return action.payload;
    case RESET_ANIMES:
      return null;
    default:
      return state;
  }
};

export default animes;
