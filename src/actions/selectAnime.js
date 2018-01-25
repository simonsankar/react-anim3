import { SELECTED_ANIME } from './types';

//Select anime
export const selectAnime = anime => {
  return {
    type: SELECTED_ANIME,
    payload: anime
  };
};
