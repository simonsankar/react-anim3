import { GET_EPISODES, RESET_EPISODES } from '../actions/types';

const episodes = (state = null, action) => {
  switch (action.type) {
    case GET_EPISODES:
      console.log('Episodes Reducer:', action.payload);
      return action.payload;
    case RESET_EPISODES:
      return null;
    default:
      return state;
  }
};

export default episodes;
