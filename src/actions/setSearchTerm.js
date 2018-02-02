import { SET_SEARCH_TERM } from './types';

export const setSearchTerm = term => {
  return {
    type: SET_SEARCH_TERM,
    payload: term
  };
};
