import styled from 'styled-components/native';
import { aquamarine, darkBlue } from '../../theme/index';

export const ScheduleItemContainer = styled.View`
  background-color: ${darkBlue};
  align-items: ${props=>props.paintBG? 'center' : 'flex-start'}
`;

export const InnerContainer = styled.View`

`;

export const ActionContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: white;
  font-size: 20px;
`;

export const Type = styled.Text`
  color: ${aquamarine};
  font-size: 12px;
`;

export const Name = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 14px;
`;

export const Room = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 14px;
`;

export const Header = styled.View`
  background-color: ${aquamarine};
  width: 100%;
  height: 36px;
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 16px;
`;