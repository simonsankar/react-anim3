import { GET_QUICKLISTS_ANIMES } from '../actions/types';

const quickLists = (state = null, action) => {
  switch (action.type) {
    case GET_QUICKLISTS_ANIMES:
      console.log('The lists', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default quickLists;
