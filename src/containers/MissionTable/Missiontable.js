import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Exchange from './Exchange';
import Mission from './Mission';
import Mask from './Mask';
import apiServices from '../../api/services';
import { MISSION_STATUS } from '../../store';
import { Consumer } from '../../store';

const TYPE = [
  { id: 'task', text: 'INTERACTION' },
  { id: 'quiz', text: 'Q&A' },
];

@Consumer('missionStore')
export default class MissionTable extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'missionTable.title', 'mode1')

  goMission = (id, type) => {
    this.props.navigation.navigate('MissionDetail', { id, type });
  }

  render() {
    const {
      missionStore: { balance, quizs },
    } = this.props.context;
    return (
      <Style.MissionContainer>
        <Style.ScrollContainer>
          <View>
            <Style.ExchangeZone>
              <Style.Box width="100%" height="193px">
                <Exchange balance={balance} />
              </Style.Box>
            </Style.ExchangeZone>
            <Style.MissionZone>
              {
                quizs.map((quiz, index) => {
                  const { status, type, title } = quiz;

                  // if (status === MISSION_STATUS.NOT_OPEN) { // 尚未開放挑戰
                  //   return (
                  //     <Style.Box key={`quiz_${index}`}>
                  //       <Mission isLocked title={I18n.t('missionTable.unlock')} content="01:22:03"></Mission>
                  //     </Style.Box>
                  //   );
                  // }

                  const disabled = (status === MISSION_STATUS.SUCCESS || status === MISSION_STATUS.FAIL);
                  const currentType = TYPE.find(o => o.id === type);

                  return (
                    <Style.Box key={`quiz_${index}`} disabled={disabled} onPress={() => this.goMission(quiz.id, currentType.id)}>
                      <Mission title={currentType.text} content={title}></Mission>
                      {
                        disabled && (
                          <Mask status={status} goMission={() => this.goMission(quiz.id, currentType.id)}/>
                        )
                      }
                    </Style.Box>
                  );
                })
              }
            </Style.MissionZone>
          </View>
        </Style.ScrollContainer>
      </Style.MissionContainer>
    );
  }
}