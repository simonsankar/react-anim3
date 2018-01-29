import { SET_SERVER } from './types';

export const setServer = serverNo => {
  return {
    type: SET_SERVER,
    payload: serverNo
  };
};
