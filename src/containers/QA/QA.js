import React, { Component } from 'react';
import { Text } from 'react-native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

export default class QA extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qa.title', 'mode2')

  render() {
    return (
      <Style.QAContainer>
        <Style.Question>區塊鏈為什麼叫做區塊鏈？</Style.Question>
        <Style.AnswerContainer>
          <Style.AnswerButton><Style.AnswerButtonText>A</Style.AnswerButtonText></Style.AnswerButton>
          <Style.AnswerText>書是理想的伴侶，也不免加添他們的煩愁</Style.AnswerText>
        </Style.AnswerContainer>
        <Style.AnswerContainer>
          <Style.AnswerButton><Style.AnswerButtonText>B</Style.AnswerButtonText></Style.AnswerButton>
          <Style.AnswerText>書是理想的伴侶，也不免加添他們的煩愁</Style.AnswerText>
        </Style.AnswerContainer>
        <Style.AnswerContainer>
          <Style.AnswerButton><Style.AnswerButtonText>C</Style.AnswerButtonText></Style.AnswerButton>
          <Style.AnswerText>書是理想的伴侶，也不免加添他們的煩愁</Style.AnswerText>
        </Style.AnswerContainer>
        <Style.AnswerContainer>
          <Style.AnswerButton><Style.AnswerButtonText>D</Style.AnswerButtonText></Style.AnswerButton>
          <Style.AnswerText>書是理想的伴侶，也不免加添他們的煩愁</Style.AnswerText>
        </Style.AnswerContainer>
      </Style.QAContainer>
    );
  }
}