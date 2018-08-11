import styled from 'styled-components/native';
import {
  darkBlue, scheduleCardTypeColor,
  } from '../../theme/index';

export const QAContainer = styled.View`
  background-color: ${darkBlue};
  flex-grow:1;
  padding: 20px;
`;

export const Question = styled.Text`
  font-size: 22px;
  color: white;
  margin-bottom: 30px;
`;

export const AnswerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const AnswerButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 2px solid ${scheduleCardTypeColor};
  background-color: ${p => p.selected ? scheduleCardTypeColor : '#00214a'};
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

export const AnswerButtonText = styled.Text`
  font-size: 20px;
  color: ${p => p.selected ? darkBlue : scheduleCardTypeColor};
`;

export const AnswerText = styled.Text`
  flex: 1;
  flex-wrap: wrap;
  font-size: 18px;
  color: white;
`;