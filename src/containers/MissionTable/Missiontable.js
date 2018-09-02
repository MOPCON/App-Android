import React, { Component } from 'react';
import { View } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Exchange from './Exchange';
import Mission from './Mission';
import Mask from './Mask';

export default class MissionTable extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'missionTable.title', 'mode1')

  render() {
    return (
      <Style.MissionContainer>
        <Style.ScrollContainer>
          <View>
            <Style.ExchangeZone>
              <Style.Box width="100%" height="193px">
                <Exchange></Exchange>
              </Style.Box>
            </Style.ExchangeZone>
            <Style.MissionZone>
              <Style.Box>
                <Mission isLocked title="解鎖倒數" content="01:22:03"></Mission>
              </Style.Box>
              <Style.Box disabled>
                <Mission title="Q&A" content="找到紫色小鴨"></Mission>
                <Mask status="0"/>
              </Style.Box>
               <Style.Box disabled>
                <Mission title="Q&A" content="找到紫色小鴨"></Mission>
                <Mask status="1"/>
              </Style.Box>
               <Style.Box>
                <Mission title="Q&A" content="找到紫色小鴨"></Mission>
              </Style.Box>
               <Style.Box>
                <Mission title="Q&A" content="找到紫色小鴨"></Mission>
              </Style.Box>
               <Style.Box>
                <Mission title="Q&A" content="找到紫色小鴨"></Mission>
              </Style.Box>
            </Style.MissionZone>
          </View>
        </Style.ScrollContainer>
      </Style.MissionContainer>
    );
  }
}