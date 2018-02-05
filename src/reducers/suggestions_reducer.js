import { GET_SEARCH_SUGGESTIONS } from '../actions/types';

const suggestions = (state = null, action) => {
  switch (action.type) {
    case GET_SEARCH_SUGGESTIONS:
      console.log('Suggestions Reducer:', action.payload);
      if (action.payload.length === 5) {
        action.payload.push({ title: 'View All', url: '/search?keyword=' });
        return action.payload;
      } else return action.payload;
    default:
      return state;
  }
};
export default suggestions;
