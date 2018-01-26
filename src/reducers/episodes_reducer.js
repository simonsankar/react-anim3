import { GET_EPISODES } from '../actions/types';

const episodes = (state = null, action) => {
  switch (action.type) {
    case GET_EPISODES:
      console.log('Episodes Reducer:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default episodes;
