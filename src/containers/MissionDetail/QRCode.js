import React, { Component } from 'react';
import { Text } from 'react-native';
import I18n from '../../locales';
import * as Style from './style';

export default class QRCode extends Component {
  handleSubmit = () => {
    const { task } = this.props;

    this.props.navigation.navigate('QRCode', { task });
  }

  render() {
    const { task } = this.props;

    return (
      <Style.QRCodeContainer>
        <Style.QRCodeTitle>{ task.title }</Style.QRCodeTitle>
        <Style.QRCodeText>{ task.description }</Style.QRCodeText>
        <Style.Button onPress={this.handleSubmit}>
          <Style.ButtonText>{I18n.t('missionTable.scanQRCode')}</Style.ButtonText>
        </Style.Button>
      </Style.QRCodeContainer>
    );
  }
}