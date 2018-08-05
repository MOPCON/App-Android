import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRCode extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qrcode.title', 'mode2')

  state = {
    message: '',
  }

  onSuccess = (e) => {
    this.setState({
      message: e.data,
    });
    console.log(e.data);
  }

  render() {
    const cameraHeight = Dimensions.get('window').height - 80;

    return (
      <Style.QRCodeContainer>
        <Text style={{color: '#fff'}}>{this.state.message}</Text>
        <QRCodeScanner
          cameraStyle={{height: cameraHeight}}
          onRead={this.onSuccess}
          topContent={null}
        />
      </Style.QRCodeContainer>
    );
  }
}