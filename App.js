import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './app/reducers';
import Propagate from './app/components/Propagate';

// initialize logger
const loggerMiddleware = createLogger({
  predicate: () => __DEV__, // eslint-disable-line
});

// initialize redux store with middleware
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

// wraps app in provider to use redux store
const App = () => (
  <Provider store={store}>
    <Propagate />
  </Provider>
);

AppRegistry.registerComponent('App', () => App);

export default App;
