import {
  GET_UPDATED_ANIMES,
  GET_NEWEST_ANIMES,
  GET_GENRE_ANIMES,
  RESET_ANIMES
} from './types';
import Anime from '../services/anime';

const newest = '/newest?page=';
const updated = '/updated?page=';
// All anime requests

// Newest
export const getNewestAnimes = (page = 1) => {
  console.log('Getting newest animes');
  const request = Anime.getAnimes(newest + page);
  return {
    type: GET_NEWEST_ANIMES,
    payload: request
  };
};
// Updated
export const getUpdatedAnimes = (page = 1) => {
  console.log('Getting updated animes');
  const request = Anime.getAnimes(updated + page);
  return {
    type: GET_UPDATED_ANIMES,
    payload: request
  };
};
// Genre based
export const getGenreAnimes = genre => {
  console.log('Getting genre animes');
  const request = Anime.getAnimes(genre);
  return {
    type: GET_GENRE_ANIMES,
    payload: request
  };
};
// Reset animes
export const resetAnimes = () => {
  console.log('Resetting anime list');
  return {
    type: RESET_ANIMES
  };
};
