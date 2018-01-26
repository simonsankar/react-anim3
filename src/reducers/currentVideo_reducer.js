import { GET_VIDEO } from '../actions/types';

const currentVideo = (state = null, action) => {
  switch (action.type) {
    case GET_VIDEO:
      return action.payload;
    default:
      return state;
  }
};

export default currentVideo;
