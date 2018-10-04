import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Exchange from './Exchange';
import Mission from './Mission';
import Mask from './Mask';
import apiServices from '../../api/services';

const STATUS = {
  NOT_CHALLANGE: '1',
  NOT_OPEN: '0',
  SUCCESS: '2',
  FAIL: '-1',
};

const TYPE = [
  { id: 'task', text: 'INTERACTION' },
  { id: 'quiz', text: 'Q&A' },
];

export default class MissionTable extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'missionTable.title', 'mode1')

  state = {
    quizs: [],
    balance: '0',
  }

  async componentDidMount() {
    const UUID = await AsyncStorage.getItem('UUID');
    const public_key = await AsyncStorage.getItem('public_key');
    const {balance} = await apiServices.post('/get-balance', { UUID, public_key });
    const result = await apiServices.get('/get-quiz');
    // 之後格式會改
    const quizs = result.reduce((acc, val) => [...acc, ...(val.items || [])], []);

    /*
      status: (按照此順序)
      1 尚未挑戰
      0 尚未開放挑戰
      2 挑戰成功
      -1 挑戰失敗
    */
    this.setState({
      balance,
      quizs: [
        ...quizs.filter(o => o.status === STATUS.NOT_CHALLANGE),
        ...quizs.filter(o => o.status === STATUS.NOT_OPEN),
        ...quizs.filter(o => o.status === STATUS.SUCCESS),
        ...quizs.filter(o => o.status === STATUS.FAIL),
      ]
    });
  }

  render() {
    const { quizs, balance } = this.state;

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

                  if (status === STATUS.NOT_OPEN) { // 尚未開放挑戰
                    return (
                      <Style.Box key={`quiz_${index}`}>
                        <Mission isLocked title={I18n.t('missionTable.unlock')} content="01:22:03"></Mission>
                      </Style.Box>
                    );
                  }

                  const disabled = (status === STATUS.SUCCESS || status === STATUS.FAIL);
                  const currentType = TYPE.find(o => o.id === type);

                  return (
                    <Style.Box key={`quiz_${index}`} disabled={disabled}>
                      <Mission title={currentType.text} content={title}></Mission>
                      {
                        disabled && (
                          <Mask status={status} />
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