import { GET_GENRES } from '../actions/types';

const genres = (state = null, action) => {
  switch (action.type) {
    case GET_GENRES:
      console.log('Genres reducer', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default genres;
