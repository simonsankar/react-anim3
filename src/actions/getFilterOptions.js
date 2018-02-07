import { GET_FILTER_OPTIONS } from './types';
import Anime from '../services/anime';

export const getFilterOptions = () => {
  const request = Anime.getFilterOptions();
  return {
    type: GET_FILTER_OPTIONS,
    payload: request
  };
};
