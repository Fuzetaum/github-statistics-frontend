import React from 'react';
import { Provider } from 'react-redux';

import Search from './Search';

import store from './store';

import './Index.scss';

const Index = () => {
  return (
    <Provider store={store}>
      <Search />
    </Provider>
  );
};

export default Index;
