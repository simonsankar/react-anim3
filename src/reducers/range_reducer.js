import { SET_RANGE } from '../actions/types';

const server = (state = 0, action) => {
  switch (action.type) {
    case SET_RANGE:
      return action.payload;
    default:
      return state;
  }
};

export default server;
