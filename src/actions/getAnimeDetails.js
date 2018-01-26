import {
  GET_ANIME_DETAILS,
  RESET_ANIME_DETAILS,
  GET_CURRENT_ANIME_DETAILS
} from './types';
import Anime from '../services/anime';

// All anime details

export const getAnimeDetails = url => {
  console.log('Getting anime details');
  const request = Anime.getAnimeDetails(url);
  return {
    type: GET_ANIME_DETAILS,
    payload: request
  };
};

export const getCurrentAnimeDetails = url => {
  console.log('Getting current anime details:');
  const request = Anime.getCurrentAnimeDetails(url);
  return {
    type: GET_CURRENT_ANIME_DETAILS,
    payload: request
  };
};

export const resetAnimeDetails = () => {
  console.log('Resetting details');
  return {
    type: RESET_ANIME_DETAILS
  };
};
