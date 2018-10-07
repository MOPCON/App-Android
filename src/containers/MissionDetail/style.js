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
  margin-bottom: 72px;
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

export const QuizButton = styled.View`
  width: 100%;
  height: 60px;
  background: ${modBorder};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuizButtonText = styled.Text`
  color: #fff;
  font-size: 22px;
`;

export const QuizFail = styled.View`
  width: 100%;
  height: 60px;
  background: #002a51;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QuizFailText = styled.Text`
  color: ${modBorder};
  font-size: 14px;
`;

// QRCode
export const QRCodeContainer = styled.View`
  
`;