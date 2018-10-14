import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Text } from 'react-native';
import produce from 'immer';
import QRCodeScanner from 'react-native-qrcode-scanner';
import apiServices from '../../api/services';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { STATUS } from '../MissionTable/Missiontable';
import { Consumer } from '../../store';

@Consumer('balanceStore', 'quizStore')
export default class QRCode extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qrcode.title', 'mode2')

  onSuccess = async (e) => {
    const data = JSON.parse(e.data);
    const { task } = this.props.navigation.state.params;

    if (data.id && data.token) {
      // 判斷掃到的id跟題目id是否相同
      // if (data.id !== task.id) return;

      const public_key = await AsyncStorage.getItem('public_key');
      const params = {
        public_key,
        id: data.id,
        token: data.token,
      };

      const result = await apiServices.post('/get-hawker-mission', params);
      
      if (result.is_success) {
        const {
          balanceStore: { count, setBalance },
          quizStore: { quizs, setQuiz },
        } = this.props.context;

        // 累計Mo數
        const reward = +(result.reward);
        setBalance(count + reward);

        // 修改Quiz status
        const newTask = {
          ...task,
          status: STATUS.SUCCESS,
          reward,
        }

        const taskIndex = quizs.findIndex(o => o.id === task.id);
        setQuiz(produce(quizs, (draftState) => {
          draftState[taskIndex] = newTask;
        }));

        this.props.navigation.navigate('MissionDetail', { quiz: newTask, type: 'task' });
      }
    }
  }

  render() {
    const cameraHeight = Dimensions.get('window').height - 80;

    return (
      <Style.QRCodeContainer>
        <QRCodeScanner
          cameraStyle={{height: cameraHeight}}
          onRead={this.onSuccess}
          topContent={null}
        />
      </Style.QRCodeContainer>
    );
  }
}