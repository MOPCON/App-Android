import styled from 'styled-components/native';
import {
  darkBlue, modBorder,
} from '../../theme/index';

export const MissionContainer = styled.View`
  background-color: ${darkBlue};
  flex-grow:1;
  padding: 20px;
`;

// Quiz
export const QuizContainer = styled.View`

`;


export const QuizTitle = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-bottom: 24px;
`;

export const QuizOptionContainer = styled.View`

`;

export const QuizContent = styled.TouchableOpacity`
  width: 100%;
  margin-bottom: 36px;
  display: flex;
  flex-direction: row;
`;

export const QuizOption = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  border: 1px solid ${modBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin-right: 12px;
  background: ${props => props.active ? modBorder : darkBlue};
`;

export const QuizOptionText = styled.Text`
  color: ${props => props.active ? '#fff' : modBorder};
  font-size: 16px;
  text-align: center;
`;

export const QuizText = styled.Text`
  color: ${modBorder};
  font-size: 18px;
`;

// QRCode
export const QRCodeContainer = styled.View`
  
`;