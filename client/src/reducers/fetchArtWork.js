export default (state = { all: {}, one: {} }, action) => {
  switch (action.type) {
    case 'FETCH_THE_ARTWORK':
      return { ...state, one: action.payload._id };
    case 'FETCH_ALL_ARTWORK':
      return { ...state, all: action.payload };
    default:
      return state;
  }
};
