import { SELECTED_ANIME } from '../actions/types';

const selectedAnime = (state = null, action) => {
  switch (action.type) {
    case SELECTED_ANIME:
      console.log('Selected Anime:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default selectedAnime;
