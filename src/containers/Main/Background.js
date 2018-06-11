import React, { Component } from 'react';
import {
  View,
  Image
} from 'react-native';

import bgMainPage from '../../images/bgMainPage.png';

export default class Background extends Component {
  render() {
    return (
      <View>
        <Image
          style={styles.bgMainPage}
          source={bgMainPage}
        />
      </View>
    );
  }
}

const styles = {
  bgMainPage: {
    flex: 1,
    position: 'absolute',
    top: 20,
    left: 0,
  },
};
