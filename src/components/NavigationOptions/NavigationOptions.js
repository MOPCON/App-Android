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
      borderBottomColor: 'rgba(0, 170, 240, 0.2)',
      borderBottomWidth: 2,
    },
    headerTitleStyle: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
      marginHorizontal: 'auto',
    },
    title: I18n.t(title),
  };

  if (mode === 'mode1') {
    options.headerLeft = (props) => (
      <View {...props} />
    );

    options.headerRight = (props) => (
      <TouchableOpacity
          {...props}
        style={{width: 24, height: 24, marginRight: 30}}
        onPress={() => navigation.goBack()}
      >
        <Image source={iconClose}/>
      </TouchableOpacity>
    )
  } else if (mode === 'mode2') {

    options.headerLeft = (props) => (
      <TouchableOpacity
          {...props}
        style={{width: 24, height: 24, marginLeft: 20}}
        onPress={() => navigation.goBack()}
      >
        <Image source={iconLeftArrow}/>
      </TouchableOpacity>
    );

    options.headerRight = (props) => (
      <View {...props} style={{marginRight: 30}} />
    )
  }

  return options;
};
