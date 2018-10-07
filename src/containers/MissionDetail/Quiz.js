import React, { Component } from 'react';
import { View } from 'react-native';
import I18n from '../../locales';
import { STATUS } from '../MissionTable/Missiontable';
import * as Style from './style';

export default class Quiz extends Component {
  state = {
    selected: '',
  }

  handleClick = (option) => {
    this.setState({
      selected: option
    });
  }

  render() {
    const { selected } = this.state;
    const { quiz } = this.props;
    const status = quiz.status;
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
            <Style.QuizButton>
              <Style.QuizButtonText>{I18n.t('missionTable.submit')}</Style.QuizButtonText>
            </Style.QuizButton>
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