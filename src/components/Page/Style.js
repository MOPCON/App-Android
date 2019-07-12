import styled from 'styled-components/native';
import { ScrollView, View, Text } from 'react-native';
import * as theme from '../../theme';

export const Main = styled.View`
  flex-grow: 1;
  background-color: ${theme.darkBlue};
`;

export const Title = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 1px #e0e0e0;
  border-bottom-color: #163144;
  border-bottom-width: 2;
`;

export const TitleText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
