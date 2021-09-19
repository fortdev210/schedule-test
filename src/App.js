import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Switch,  Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Calender from './container/calender';
import { store } from './redux/store';

import './App.css';
const history = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
                return (
                  <Redirect to="/calendar" />
                )
            }}
          />
          <Route
              path="/calendar"
              exact={true}
              render={(props) => (
                <div className="App">
                  <Calender />
                </div>
              )}
            />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
