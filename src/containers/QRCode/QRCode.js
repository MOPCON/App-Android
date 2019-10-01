import React, { Component } from 'react';
import { Dimensions, Text, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import produce from 'immer';
import QRCodeScanner from 'react-native-qrcode-scanner';
import apiServices from '../../api/services';
import * as Style from './style';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import ModalFinish from '../../components/ModalFinish/ModalFinish';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { MISSION_STATUS, Consumer } from '../../store';
import gameServices from '../../api/gameServices';

@Consumer('gameStore')
export default class QRCode extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qrcode.title', 'mode2')

  state = {
    modalVisible: false,
    isLoading: false,
  }

  onSuccess = async (e) => {
    this.setState({ isLoading: true });
    const vKey = e.data;
    const { uid } = this.props.navigation.state.params;

    const payload = {
      uid,
      vKey,
    };

    try {
      const { loadGameList } = this.props.context.gameStore;
      const { data } = await gameServices.post('/verify/task', payload);
      loadGameList();
      this.setState({ modalVisible: true });
    } catch (error) {
      Alert.alert(I18n.t('game.invalid_task_password'));
      this.props.navigation.goBack();
    }
    this.setState({ isLoading: false });
  }

  onCloseModal = () => {
    const { uid } = this.props.navigation.state.params;
    this.setState({ modalVisible: false });
    this.props.navigation.navigate('GameDetail', { uid, pass: true });
  }

  render() {
    const cameraHeight = Dimensions.get('window').height - 80;

    return (
      <Style.QRCodeContainer>
        <QRCodeScanner
          cameraStyle={{ height: cameraHeight }}
          onRead={this.onSuccess}
          topContent={null}
        />
        {
          this.state.isLoading ? <LoadingIcon size="large" color="#ffffff" /> : null
        }

        <ModalFinish visible={this.state.modalVisible} onClose={this.onCloseModal} />
      </Style.QRCodeContainer>
    );
  }
}