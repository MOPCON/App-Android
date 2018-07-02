import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

export default class CommunityDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'home.Community', 'mode2')

  render() {
    return (
      <Style.Container>
      </Style.Container>
    );
  }
}