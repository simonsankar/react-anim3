import {
  GET_UPDATED_ANIMES,
  GET_NEWEST_ANIMES,
  GET_GENRE_ANIMES,
  GET_FEATURED_ANIMES,
  GET_SEARCHED_ANIMES,
  RESET_ANIMES,
  GET_TOTAL_PAGES,
  GET_QUICKLISTS_ANIMES,
  SELECT_LIST
} from './types';
import Anime from '../services/anime';

const newest = '/newest?page=';
const updated = '/updated?page=';
// const search = '/search?&keyword=';
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

//Featured Anime
export const getFeaturedAnimes = () => {
  console.log('Getting featured animes');
  const request = Anime.getFeaturedAnimes();
  return {
    type: GET_FEATURED_ANIMES,
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
// Searched based
export const getSearchedAnimes = (path, pg = 1) => {
  console.log('Getting Searched animes');
  const request = Anime.getAnimes(`${path}&page=${pg}`);
  return {
    type: GET_SEARCHED_ANIMES,
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

//Total pages

export const getTotalPages = (type, path) => {
  console.log('Getting Total pages for:', type);
  switch (type) {
    case 'NEWEST':
      let requestNewest = Anime.getTotalPages(newest + '1');
      return {
        type: GET_TOTAL_PAGES,
        payload: requestNewest
      };
    case 'UPDATED':
      let requestUpdated = Anime.getTotalPages(updated + '1');
      return {
        type: GET_TOTAL_PAGES,
        payload: requestUpdated
      };
    case 'SEARCH':
      let requestSearched = Anime.getTotalPages(path);
      return {
        type: GET_TOTAL_PAGES,
        payload: requestSearched
      };
    default:
      return null;
  }
};

//Quick LISTS Anime
export const getQuickListsAnimes = () => {
  console.log('Getting updated animes');
  const request = Anime.getQuickListsAnimes();
  return {
    type: GET_QUICKLISTS_ANIMES,
    payload: request
  };
};
//Select a quick list
export const selectQuickList = (choice = 0) => {
  console.log('Selecting list:', choice);
  return {
    type: SELECT_LIST,
    payload: choice
  };
};
