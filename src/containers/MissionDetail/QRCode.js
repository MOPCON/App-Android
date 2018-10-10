import React, { Component } from 'react';
import { Text } from 'react-native';
import * as Style from './style';

export default class Quiz extends Component {
  render() {
    return (
      <Style.QRCodeContainer>
        <Text>QR Code</Text>
      </Style.QRCodeContainer>
    );
  }
}