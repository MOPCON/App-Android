import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

export const MoreContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
  flex-grow:1;
`;

export const MenuItem = styled.TouchableOpacity`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MenuTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const MenuIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 20px;
`;

export const MenuText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

export const RightArrow = styled.Image`
  width: 10;
  height: 18;
`;
