import { GET_SEARCH_SUGGESTIONS } from './types';
import Anime from '../services/anime';

export const getSearchSuggestions = keyword => {
  const request = Anime.getSuggestions(keyword);
  return {
    type: GET_SEARCH_SUGGESTIONS,
    payload: request
  };
};
