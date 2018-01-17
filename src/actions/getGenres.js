import { GET_GENRES } from './types';
import Anime from '../services/anime';

export const getGenres = () => {
  const request = Anime.getGenres();
  return {
    type: GET_GENRES,
    payload: request
  };
};
