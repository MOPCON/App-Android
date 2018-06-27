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

export const Mod = styled.TouchableOpacity`
  width: 107px;
  height: 36px;
  border: 1px solid ${modBorder};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-right: 8;
`;

export const ModText = styled.Text`
  color: ${modBorder};
  font-size: 14;
  line-height: 16;
  letter-spacing: 1.3;
`;

export const ModIcon = styled.Image`
  width: 24;
  height: 24;
  margin-right: 4;
`;