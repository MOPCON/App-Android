import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import apiServices from '../../api/services';
import iconCoinImg from '../../images/icon/iconCoin.png';
import { MISSION_STATUS, Consumer } from '../../store';
import * as Style from './style';

@Consumer('missionStore')
export default class Quiz extends Component {
  state = {
    selected: '',
  }

  handleClick = (option) => {
    this.setState({
      selected: option
    });
  }

  handleSubmit = async () => {
    const { id } = this.props;
    const { setQuizStatus, setBalance, balance, quizs } = this.props.context.missionStore;
    const quiz = quizs.find(o => o.id === id);

    const answer = String((this.state.selected.charCodeAt(0)) - 65 + 1); // 先轉回index，再加1
    if (!answer) return;

    if (answer === quiz.answer) { // 答對
      setQuizStatus(quiz.id, MISSION_STATUS.SUCCESS);
      setBalance(balance + +(quiz.reward));
    } else {                      // 答錯
      setQuizStatus(quiz.id, MISSION_STATUS.FAIL, answer);
    }
  }

  render() {
    const { selected } = this.state;
    const { id } = this.props;
    const { quizs } = this.props.context.missionStore;
    const quiz = quizs.find(o => o.id === id);

    const answer = +(quiz.answer) - 1; // 選項用index, 所以這邊要扣1
    const disabled = (quiz.status === MISSION_STATUS.SUCCESS || quiz.status === MISSION_STATUS.FAIL);

    return (
      <Style.QuizContainer>
        <Style.QuizTitle>{quiz.title}</Style.QuizTitle>
        <Style.QuizOptionContainer>
          {
            Object.keys(quiz.options).map((key, i) => {
              const option = String.fromCharCode(65 + +(i));

              /*
                情況1: 使用者選擇
                情況2: 正確或錯誤時，顯示正確答案
              */
              const active = (option === selected
                || (disabled && option === String.fromCharCode(65 + +(quiz.answer) - 1))); // answer需要-1才是index

              const wrong = quiz.wrongAnswer && (option === String.fromCharCode(65 + +(quiz.wrongAnswer) - 1));

              return (
                <Style.QuizContent key={`quiz${i}`} disabled={disabled} onPress={() => this.handleClick(option)}>
                  <Style.QuizOption active={active} wrong={wrong}>
                    <Style.QuizOptionText active={active} wrong={wrong}>{option}</Style.QuizOptionText>
                  </Style.QuizOption>
                  <Style.QuizText>{quiz.options[key]}</Style.QuizText>
                </Style.QuizContent>
              );
            })
          }
        </Style.QuizOptionContainer>
        {
          // 未答題
          (quiz.status === MISSION_STATUS.NOT_CHALLANGE && Boolean(selected)) && (
            <Style.Button onPress={this.handleSubmit}>
              <Style.ButtonText>{I18n.t('missionTable.submit')}</Style.ButtonText>
            </Style.Button>
          )
        }
        {
          // 答對
          (quiz.status === MISSION_STATUS.SUCCESS) && (
            <Style.QuizSuccess>
              <Style.QuizSuccessText>{I18n.t('missionTable.successMessage')}</Style.QuizSuccessText>
              <Style.QuizReward>
                <Style.QuizRewardCoin source={iconCoinImg} />
                <Style.QuizRewardText>{quiz.reward}</Style.QuizRewardText>
              </Style.QuizReward>
            </Style.QuizSuccess>
          )
        }
        {
          // 答錯
          (quiz.status === MISSION_STATUS.FAIL) && (
            <Style.QuizFail>
              <Style.QuizFailText>{I18n.t('missionTable.failMessage')}</Style.QuizFailText>
            </Style.QuizFail>
          )
        }
      </Style.QuizContainer>
    );
  }
}
