import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import * as theme from '../../theme';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.darkBlue}
        />
      </View>
    );
  }
}

const styles = {
  header: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: theme.darkBlue
  }
}