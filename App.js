import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import reducers from './src/reducers';
import Home from './src/screens/Home';
import ImageDetails from './src/screens/ImageDetails';
import { createStackNavigator } from 'react-navigation';

const store = createStore(reducers, applyMiddleware(ReduxThunk));

const StackNav = createStackNavigator({
  Home: {
    screen: Home
  },
  ImageDetails: {
    screen: ImageDetails
  }
}, {
  headerMode: 'none'
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StackNav />
      </Provider>
    );
  }
}
