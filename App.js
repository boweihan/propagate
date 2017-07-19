import React from 'react';
import { AppRegistry } from 'react-native';
import Propagate from './app/components/Propagate';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger}  from 'redux-logger';
import reducer from './app/reducers';

// initialize logger
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

// initialize redux store with middleware
function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware, // lets us dispatch() functions
            loggerMiddleware
        )
    );
    return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

// wraps app in provider to use redux store
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Propagate />
            </Provider>
        );
    }
}

AppRegistry.registerComponent('App', () => App);
