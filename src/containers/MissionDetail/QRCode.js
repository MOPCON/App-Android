import React, { Component } from 'react';
import { Text } from 'react-native';
import I18n from '../../locales';
import { MISSION_STATUS, Consumer } from '../../store';
import iconCoinImg from '../../images/icon/iconCoin.png';
import * as Style from './style';

@Consumer('missionStore')
export default class QRCode extends Component {
  handleSubmit = (task) => {
    this.props.navigation.navigate('QRCode', { task });
  }

  render() {
    const { id } = this.props;
    const { quizs } = this.props.context.missionStore;
    const task = quizs.find(o => o.id === id);

    return (
      <Style.QRCodeContainer>
        <Style.CardView>
          <Style.CardImg
            source={{ uri: task.banner_url }}
          />
          </Style.CardView>
        <Style.QRCodeTitle>{ task.title }</Style.QRCodeTitle>
        <Style.QRCodeText>{ task.description }</Style.QRCodeText>
        {
          // 未答題
          (task.status === MISSION_STATUS.NOT_CHALLANGE) && (
            <Style.Button onPress={() => this.handleSubmit(task)}>
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