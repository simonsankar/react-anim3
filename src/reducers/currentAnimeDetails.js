import { GET_CURRENT_ANIME_DETAILS } from '../actions/types';

const currentAnimeDetails = (state = null, action) => {
  switch (action.type) {
    case GET_CURRENT_ANIME_DETAILS:
      return action.payload;
    default:
      return state;
  }
};

export default currentAnimeDetails;
