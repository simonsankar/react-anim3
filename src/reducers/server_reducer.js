import { SET_SERVER } from '../actions/types';

const server = (state = 0, action) => {
  switch (action.type) {
    case SET_SERVER:
      return action.payload;
    default:
      return state;
  }
};

export default server;
