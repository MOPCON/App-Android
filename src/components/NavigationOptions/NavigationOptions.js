import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import I18n from '../../locales';
import * as theme from '../../theme';

export default (navigation, title) => ({
  headerStyle: {
    backgroundColor: theme.darkBlue,
  },
  headerTitleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  headerLeft: <View />,
  headerRight: (
    <Icon
      name="close"
      style={{color: '#8a8aa1', marginRight: 40}}
      size={25}
      onPress={() => navigation.goBack()}
    />
  ),
  title: I18n.t(title),
});