import { SELECT_LIST } from '../actions/types';

const selectedList = (state = null, action) => {
  switch (action.type) {
    case SELECT_LIST:
      console.log('selected list', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default selectedList;
