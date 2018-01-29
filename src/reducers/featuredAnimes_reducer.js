import { GET_FEATURED_ANIMES } from '../actions/types';

const featuredAnimes = (state = null, action) => {
  switch (action.type) {
    case GET_FEATURED_ANIMES:
      console.log('Getting featured:', action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default featuredAnimes;
