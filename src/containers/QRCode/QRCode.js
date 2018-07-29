import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRCode extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qrcode.title', 'mode2')

  onSuccess = (e) => {
    console.log(e);
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