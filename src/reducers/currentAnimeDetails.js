import {
  GET_CURRENT_ANIME_DETAILS,
  RESET_CURRENT_ANIME_DETAILS
} from '../actions/types';

const currentAnimeDetails = (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_ANIME_DETAILS:
      return action.payload;
    case RESET_CURRENT_ANIME_DETAILS:
      return null;
    default:
      return state;
  }
};

export default currentAnimeDetails;
