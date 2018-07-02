import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

export const SDContainer = styled.View`
  background-color: ${darkBlue};
  flex: 1;
`;
export const SDScrollView = styled.ScrollView``;
export const HeaderImage = styled.Image`
  width: 100%;
  height: 200px;
  background-color: #ccc;
`;
export const IntroContainer = styled.View`
  padding: 16px;
`;
export const DesText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  letter-spacing: 0.3px;
  line-height: 22px;
  font-family: 'Roboto-Regular';
  text-align: justify;
`;

export const SpeechItemContainer = styled.View`
  margin-bottom: 16px;
`;