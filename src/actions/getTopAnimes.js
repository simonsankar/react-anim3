import { GET_TOP_ANIMES } from './types';
import Anime from '../services/anime';

export const getTopAnimes = period => {
  const request = Anime.getTopAnime(period);
  return {
    type: GET_TOP_ANIMES,
    payload: request
  };
};
