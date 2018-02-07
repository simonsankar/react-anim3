import { SET_PERIOD } from '../actions/types';

const period = (state = null, action) => {
  switch (action.type) {
    case SET_PERIOD:
      return action.payload;
    default:
      return state;
  }
};

export default period;
