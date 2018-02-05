import { GET_EPISODES, RESET_EPISODES } from './types';
import Anime from '../services/anime';

export const getEpisodes = url => {
  const request = Anime.getEpisodesList(url);
  return {
    type: GET_EPISODES,
    payload: request
  };
};

export const resestEpisodes = () => {
  return {
    type: RESET_EPISODES
  };
};
