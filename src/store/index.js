import { createStore } from 'redux';

const INITIAL_STATE = {};

const repositories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REPOSITORY_LOAD':
      return {
        ...state,
        [action.payload.repository]: action.payload.data,
      };
      break;
    default:
      return state;
  }
};

const store = createStore(repositories, ['Use Redux']);

export default store;