import { GET_FILTER_OPTIONS } from '../actions/types';

const filterOptions = (state = null, action) => {
  switch (action.type) {
    case GET_FILTER_OPTIONS:
      return action.payload;
    default:
      return state;
  }
};

export default filterOptions;
