import { GET_TOTAL_PAGES } from '../actions/types';

const totalPages = (state = null, action) => {
  switch (action.type) {
    case GET_TOTAL_PAGES:
      console.log('Total pages:', action.payload);
      return action.payload;
    default:
      return state;
  }
};
export default totalPages;
