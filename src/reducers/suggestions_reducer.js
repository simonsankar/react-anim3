import { GET_SEARCH_SUGGESTIONS } from '../actions/types';

const suggestions = (state = null, action) => {
  switch (action.type) {
    case GET_SEARCH_SUGGESTIONS:
      console.log('Suggestions Reducer:', action.payload);
      if (action.payload.length > 5) {
        let results = action.payload.slice(0, 5);
        results.push({ title: 'View All', url: '/search?keyword=' });
        return results;
      } else return action.payload;
    default:
      return state;
  }
};
export default suggestions;
