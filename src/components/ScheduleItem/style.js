import styled from 'styled-components/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  aquamarine, darkBlue, scheduleCardBackground,
  scheduleCardTypeColor,
} from '../../theme/index';

export const ScheduleItemContainer = styled.View`
  background-color: ${scheduleCardBackground};
  align-items: ${props => props.paintBG ? 'center' : 'flex-start'};
  padding:  ${props => props.paintBG ? '0' : '16px'};
  margin-bottom: 1px;
`;

export const InnerContainer = styled.View`

`;

export const ActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  color: white;
  font-size: 19px;
  font-family: 'Roboto-Regular';
`;

export const Type = styled.Text`
  color: ${scheduleCardTypeColor};
  font-family: 'Roboto-Regular';
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 13px;
  font-family: 'Roboto-Regular';
  letter-spacing: 0.3px;
  margin: 10px 0;
`;

export const Room = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 13px;
  font-family: 'Roboto-Regular';
  letter-spacing: 0.3px;
`;

export const Header = styled.View`
  background-color: ${aquamarine};
  width: 100%;
  height: 34px;
  justify-content: center;
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const GeoIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: 0 3px 0 -2px;
`;

export const StarIconImg = styled.Image`
  
`;

export const StarIconTouchable = styled.TouchableOpacity`
  margin-left: auto;
`;