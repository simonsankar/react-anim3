import { GET_TOP_ANIMES } from '../actions/types';

const topAnimes = (state = null, action) => {
  switch (action.type) {
    case GET_TOP_ANIMES:
      console.log('Top animes:', action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default topAnimes;
