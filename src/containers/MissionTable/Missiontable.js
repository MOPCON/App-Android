import React, { Component } from 'react';
import { View } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

export default class MissionTable extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'missionTable.title', 'mode1')

  render() {
    return (
      <Style.MissionContainer>
        <Style.ScrollContainer>
          <View>
            <Style.ExchangeZone>
              <Style.Box width="100%" height="193px"></Style.Box>
            </Style.ExchangeZone>
            <Style.MissionZone>
              <Style.Box></Style.Box>
              <Style.Box></Style.Box>
              <Style.Box></Style.Box>
              <Style.Box></Style.Box>
              <Style.Box></Style.Box>
              <Style.Box></Style.Box>
            </Style.MissionZone>
          </View>
        </Style.ScrollContainer>
      </Style.MissionContainer>
    );
  }
}