import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import I18n from '../../locales';
import apiServices from '../../api/services';
import { STATUS } from '../MissionTable/Missiontable';
import iconCoinImg from '../../images/icon/iconCoin.png';
import * as Style from './style';

export default class Quiz extends Component {
  state = {
    selected: '',
    status: STATUS.NOT_CHALLANGE,
    reward: 0,
  }

  componentDidMount() {
    const { quiz } = this.props;

    if (quiz.status === STATUS.SUCCESS || quiz.status === STATUS.FAIL) {
      this.setState({
        status: quiz.status
      });
    }
  }

  handleClick = (option) => {
    this.setState({
      selected: option
    });
  }

  handleSubmit = async () => {
    const answer = (this.state.selected.charCodeAt(0)) - 65 + 1; // 先轉回index，再加1
    if (!answer) return;
    const { quiz } = this.props;
    const public_key = await AsyncStorage.getItem('public_key');
    const params = {
      public_key,
      id: quiz.id,
      answer,
    };

    const result = await apiServices.post('/solve-quiz', params);

    this.setState({
      status: result.is_success ? STATUS.SUCCESS : STATUS.FAIL,
      reward: result.reward,
    });
  }

  render() {
    const { selected, status, reward } = this.state;
    const { quiz } = this.props;
    const answer = +(quiz.answer) - 1; // 選項用index, 所以這邊要扣1
    const disabled = (status === STATUS.SUCCESS || status === STATUS.FAIL);

    return (
      <Style.QuizContainer>
        <Style.QuizTitle>{ quiz.title }</Style.QuizTitle>
        <Style.QuizOptionContainer>
          {
            quiz.options.map((q, i) => {
              const option = String.fromCharCode(65 + +(i));

              /*
                情況1: 使用者選擇
                情況2: 正確或錯誤時，顯示正確答案
              */
              const active = (option === selected || (disabled && option === String.fromCharCode(65 + answer)));
              
              return (
                <Style.QuizContent disabled={disabled} onPress={() => this.handleClick(option)}>
                  <Style.QuizOption active={active}>
                    <Style.QuizOptionText active={active}>{option}</Style.QuizOptionText>
                  </Style.QuizOption>
                  <Style.QuizText>{q}</Style.QuizText>
                </Style.QuizContent>
              );
            })
          }
        </Style.QuizOptionContainer>
        {
          // 未答題
          (status === STATUS.NOT_CHALLANGE) && (
            <Style.QuizButton onPress={this.handleSubmit}>
              <Style.QuizButtonText>{I18n.t('missionTable.submit')}</Style.QuizButtonText>
            </Style.QuizButton>
          )
        }
        {
          // 答對
          (status === STATUS.SUCCESS) && (
            <Style.QuizSuccess>
              <Style.QuizSuccessText>{I18n.t('missionTable.successMessage')}</Style.QuizSuccessText>
              <Style.QuizReward>
                <Style.QuizRewardCoin source={iconCoinImg} />
                <Style.QuizRewardText>{reward}</Style.QuizRewardText>
              </Style.QuizReward>
            </Style.QuizSuccess>
          )
        }
        {
          // 答錯
          (status === STATUS.FAIL) && (
            <Style.QuizFail>
              <Style.QuizFailText>{I18n.t('missionTable.failMessage')}</Style.QuizFailText>
            </Style.QuizFail>
          )
        }
      </Style.QuizContainer>
    );
  }
}