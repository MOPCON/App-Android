import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image
} from 'react-native';
import * as theme from '../../theme';
import Background from './Background';
import mopconLogo from '../../images/mopconLogo01.png';

export default class Main extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Background />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.mopconLogo}>
            <Image source={mopconLogo}/>
          </View>
          <Text>carousel</Text>
        </ScrollView>
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: theme.darkBlue,
  },
  content: {
    marginTop: 62,
    flex: 1,
    alignItems: 'center',
  },
  mopconLogo: {
    marginBottom: 25,
  }
};
