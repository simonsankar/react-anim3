import { GET_ANIME_DETAILS, RESET_ANIME_DETAILS } from '../actions/types';

const animeDetails = (state = null, action) => {
  switch (action.type) {
    case GET_ANIME_DETAILS:
      console.log('Anime details reducer', action.payload);
      return action.payload || null;
    case RESET_ANIME_DETAILS:
      return null;
    default:
      return state;
  }
};

export default animeDetails;
