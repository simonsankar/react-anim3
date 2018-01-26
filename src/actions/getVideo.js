import { GET_VIDEO, RESET_VIDEO } from './types';
import Anime from '../services/anime';

export const getVideo = (vid, server) => {
  const reqest = Anime.getVideo(vid, server);
  return {
    type: GET_VIDEO,
    payload: request
  };
};

export const resetVideo = () => {
  return {
    type: RESET_VIDEO
  };
};
