import React, { Component } from 'react';
import { Dimensions, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import produce from 'immer';
import QRCodeScanner from 'react-native-qrcode-scanner';
import apiServices from '../../api/services';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { MISSION_STATUS, Consumer } from '../../store';
import gameServices from '../../api/gameServices';

@Consumer('gameStore')
export default class QRCode extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qrcode.title', 'mode2')

  onSuccess = async (e) => {
    const vKey = e.data;
    const { uid } = this.props.navigation.state.params;

    const payload = {
      uid,
      vKey,
    };

    try {
      const { loadGameList } =  this.props.context.gameStore;

      const { data } = await gameServices.post('/verify/task', payload);
      loadGameList();
      this.props.navigation.navigate('GameDetail', { uid, pass: true })
    } catch (error) {
      Alert.alert(I18n.t('game.invalid_task_password'));
    }
    // const { task } = this.props.navigation.state.params;
    // const des_key = process.env.MOPCON_DES_KEY;

    // const bytes = CryptoJS.DES.decrypt(data, des_key);
    // const id = bytes.toString(CryptoJS.enc.Utf8);

    // if (id) {
    //   // 判斷掃到的id跟題目id是否相同
    //   if (id !== task.id) return;

    //   const {
    //     missionStore: { balance, setBalance, quizs, setQuizStatus },
    //   } = this.props.context;

    //   // 累計Mo數
    //   setBalance(balance + +(task.reward));

    //   // 修改Quiz status
    //   setQuizStatus(task.id, MISSION_STATUS.SUCCESS);

    //   this.props.navigation.navigate('MissionDetail', { id: task.id, type: 'task' });
    // }
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