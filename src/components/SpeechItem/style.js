import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {
  scheduleCardTypeColor, scheduleCardBackground, inverseBackground,
} from '../../theme';


export const SpeechItemContainer = styled.View`
  padding: 16px;
  background-color: ${p => {
    switch(p.color) {
      case 'normal':
        return scheduleCardBackground;
      case 'inverse':
        return inverseBackground;
      default:
        return scheduleCardBackground;
    }
  }};
`;

export const Title = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

export const Content = styled.Text`
  color: #fff;
  font-size: 20px;
  margin-bottom: 16px;
  font-family: 'Roboto-Regular';
`;

export const FuncView = styled.View`
  flex-direction: row;
`;