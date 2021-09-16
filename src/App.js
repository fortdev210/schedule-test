import React from 'react';
import { Provider } from 'react-redux';

import Calender from './container/calender';
import { store } from './redux/store';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calender />
      </div>
    </Provider>
  );
}

export default App;
