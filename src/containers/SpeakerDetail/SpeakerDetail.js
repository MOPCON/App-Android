import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

export default class SpeakerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode2')

  render() {
    return (
      <Style.SpeakerScrollView>

      </Style.SpeakerScrollView>
    );
  }
}