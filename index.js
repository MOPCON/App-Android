import React from 'react';
import { AppRegistry, View, StatusBar } from 'react-native';
import Main from './src/containers/Main/Main';

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar
      barStyle="light-content"
    />
    <Main />
  </View>
);

AppRegistry.registerComponent('mopcon_android_app_2018', () => App);
 