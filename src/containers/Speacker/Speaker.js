import React, { Component } from 'react';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

export default class Speaker extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode1')

  render() {
    return (
      <Style.SpeakerScrollView>
      </Style.SpeakerScrollView>
    );
  }
}