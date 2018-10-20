import React, { Component } from 'react';
import { Text } from 'react-native';
import I18n from '../../locales';
import { MISSION_STATUS } from '../../store';
import iconCoinImg from '../../images/icon/iconCoin.png';
import * as Style from './style';

export default class QRCode extends Component {
  handleSubmit = () => {
    const { task } = this.props;

    this.props.navigation.navigate('QRCode', { task });
  }

  render() {
    const { task } = this.props;
    console.log('QRCODE');

    return (
      <Style.QRCodeContainer>
        <Style.QRCodeTitle>{ task.title }</Style.QRCodeTitle>
        <Style.QRCodeText>{ task.description }</Style.QRCodeText>
        {
          // 未答題
          (task.status === MISSION_STATUS.NOT_CHALLANGE) && (
            <Style.Button onPress={this.handleSubmit}>
              <Style.ButtonText>{I18n.t('missionTable.scanQRCode')}</Style.ButtonText>
            </Style.Button>
          )
        }

        {
          // 答對
          (task.status === MISSION_STATUS.SUCCESS) && (
            <Style.QuizSuccess>
              <Style.QuizSuccessText>{I18n.t('missionTable.successMessage')}</Style.QuizSuccessText>
              <Style.QuizReward>
                <Style.QuizRewardCoin source={iconCoinImg} />
                <Style.QuizRewardText>{task.reward}</Style.QuizRewardText>
              </Style.QuizReward>
            </Style.QuizSuccess>
          )
        }
      </Style.QRCodeContainer>
    );
  }
}