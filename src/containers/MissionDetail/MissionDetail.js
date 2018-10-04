import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

export default class MissionDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, `missionDetail.${navigation.state.params.type}`, 'mode2')

  render() {
    return (
      <Style.MissionContainer>
      </Style.MissionContainer>
    );
  }
}