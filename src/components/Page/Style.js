import styled from 'styled-components/native';
import { ScrollView, View, Text } from 'react-native';
import * as theme from '../../theme';

const BTN_SIZE = '100px';
export const Main = styled.View`
  flex-grow: 1;
  background-color: ${theme.darkBlue};
`;

export const Header = styled.View`
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 2px 1px #e0e0e0;
  border-bottom-color: #163144;
  border-bottom-width: 2;
`

export const HeaderLeft = styled.TouchableOpacity`
  color: white;
  align-items: center;
  justify-content: center;
  width: ${BTN_SIZE};
`
export const HeaderLeftText = styled.Text`
  color: #ffcc00;
  font-size: 17px;
`

export const HeaderRight = styled.TouchableOpacity`
  color: white;
  align-items: center;
  justify-content: center;
  width: ${BTN_SIZE};
`
export const HeaderRightText = styled.Text`
  color: #ffcc00;
  font-size: 17px;
`

export const HeaderTitle = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
`

export const TitleText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
