import { GET_EPISODES } from './types';
import Anime from '../services/anime';

export const getEpisodes = url => {
  const request = Anime.getEpisodesList(url);
  return {
    type: GET_EPISODES,
    payload: request
  };
};
