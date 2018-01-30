import { SET_RANGE } from './types';

export const setRange = rangeNo => {
  return {
    type: SET_RANGE,
    payload: rangeNo
  };
};
