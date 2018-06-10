import styled from 'styled-components/native';
import {
  aquamarine, darkBlue, scheduleCardBackground,
  scheduleCardTypeColor,
} from '../../theme/index';

export const ScheduleItemContainer = styled.View`
  background-color: ${scheduleCardBackground};
  align-items: ${props => props.paintBG ? 'center' : 'flex-start'};
  padding:  ${props => props.paintBG ? '0' : '16px'};
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
  font-family: 'Roboto-Regular';
`;

export const Type = styled.Text`
  color: ${scheduleCardTypeColor};
  font-family: 'Roboto-Medium';
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 14px;
  font-family: 'Roboto-Regular';
  letter-spacing: 0.3px;
  margin: 8px 0;
`;

export const Room = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 14px;
  font-family: 'Roboto-Regular';
  letter-spacing: 0.3px;
`;

export const Header = styled.View`
  background-color: ${aquamarine};
  width: 100%;
  height: 36px;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 16px;
`;