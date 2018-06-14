import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import * as theme from '../../theme';

export default (navigation, title) => ({
  headerStyle: {
    backgroundColor: theme.darkBlue,
  },
  headerTitleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  headerLeft: <View />,
  headerRight: (
    <Icon
      name="close"
      style={{color: '#8a8aa1', marginRight: 20}}
      size={25}
      onPress={() => navigation.goBack()}
    />
  ),
  title,
});