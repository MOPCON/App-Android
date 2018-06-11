import React from 'react';
import { View } from 'react-native';
import Header from './Header';
import Main from '../Main/Main';
import * as theme from '../../theme';

export default () => (
  <View style={{ flex: 1 }}>
    <Header />
    <Main />
  </View>
);