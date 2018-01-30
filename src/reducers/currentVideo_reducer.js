import { GET_VIDEO, RESET_VIDEO } from '../actions/types';

const currentVideo = (state = null, action) => {
  switch (action.type) {
    case GET_VIDEO:
      console.log(action.payload);
      return action.payload;
    case RESET_VIDEO:
      return null;
    default:
      return state;
  }
};

export default currentVideo;
