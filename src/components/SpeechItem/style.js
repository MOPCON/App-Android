import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import {
  modBorder, scheduleCardBackground
} from '../../theme';


export const SpeechItemContainer = styled.View`
  padding: 16px;
  background-color: ${scheduleCardBackground};
`;

export const Title = styled.Text`
  color: ${modBorder};
  font-size: 12;
  line-height: 16;
  letter-spacing: 2;
  margin-bottom: 6;
`;

export const Content = styled.Text`
  color: #fff;
  font-size: 20;
  margin-bottom: 16;
`;

export const FuncView = styled.View`
  flex-direction: row;
`;