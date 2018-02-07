import { GET_TOP_ANIMES, SET_PERIOD } from './types';
import Anime from '../services/anime';

export const getTopAnimes = () => {
  const request = Anime.getTopAnime();
  return {
    type: GET_TOP_ANIMES,
    payload: request
  };
};

export const setPeriod = period => {
  return {
    type: SET_PERIOD,
    payload: period
  };
};
