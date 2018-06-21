import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import I18n from '../../locales';
import * as theme from '../../theme';

import iconClose from '../../images/icon/iconClose.png';
import iconLeftArrow from '../../images/icon/iconLeftArrow.png';

/**
 * mode1: 左方無back button，右方 close button
 * mode2: 左方back button，右方無 close button
 */
export default (navigation, title, mode = 'mode1') => {
  const options = {
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
    title: I18n.t(title),
  };

  if (mode === 'mode1') {
    options.headerStyle = {
      ...options.headerStyle,
      borderBottomColor: '#20204c',
      borderBottomWidth: 2,
    };

    options.headerLeft = (
      <View />
    );

    options.headerRight = (
      <TouchableOpacity
        style={{width: 24, height: 24, marginRight: 40}}
        onPress={() => navigation.goBack()}
      >
        <Image source={iconClose}/>
      </TouchableOpacity>
    )
  } else if (mode === 'mode2') {
    options.headerLeft = (
      <TouchableOpacity
        style={{width: 24, height: 24, marginLeft: 20}}
        onPress={() => navigation.goBack()}
      >
        <Image source={iconLeftArrow}/>
      </TouchableOpacity>
    );
  }

  return options;
};