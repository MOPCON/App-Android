import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image
} from 'react-native';
import { darkBlue } from '../../theme';
import Background from './components/Background';
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
    backgroundColor: darkBlue,
  },
  content: {
    marginTop: 82,
    flex: 1,
    alignItems: 'center',
  },
  mopconLogo: {
    marginBottom: 25,
  }
};
