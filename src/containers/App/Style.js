import styled from 'styled-components';
import * as theme from '../../theme';

export const NavBar = styled.View`
  height: 50px;
  background-color: ${theme.darkBlue};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const NavItem = styled.TouchableOpacity`
  align-items: center;
  opacity: ${p => p.disabled ? 0.3 : 1};
`;

export const NavIcon = styled.Image`
  width: 32px;
  height: 32px;
`;

export const NavText = styled.Text`
  color: ${p => p.active ? '#00aaf0' : '#fff'};
`;