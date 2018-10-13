import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import apiServices from '../../api/services';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { Consumer } from '../../store';

@Consumer('balanceStore')
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
        const { count, setBalance } = this.props.context.balanceStore;
        setBalance(count + +(result.reward));
        this.props.navigation.goBack();
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