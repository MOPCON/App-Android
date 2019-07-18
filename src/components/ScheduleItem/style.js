import styled from 'styled-components/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  aquamarine, darkBlue, scheduleCardBackground,
  scheduleCardTypeColor,
} from '../../theme/index';

export const ScheduleItemContainer = styled.View`
  align-items: ${props => props.paintBG ? 'center' : 'flex-start'};
`;

export const InnerContainer = styled.View`

`;

export const ActionContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const TitleTouchable = styled.TouchableOpacity`
  max-width: 100%;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  margin: ${p => p.paintBG ? '20px 0' : '0'};
`;

export const NTitle = styled.Text`
  color: #ccc;
  font-size: 19px;
  font-family: 'Roboto-Regular';
  margin: 20px 0;
`;

export const Category = styled.Text`
  color: ${scheduleCardTypeColor};
  font-family: 'Roboto-Regular';
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;

export const Name = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 16px;
  font-family: 'Roboto-Regular';
  letter-spacing: 0.3px;
  margin: 10px 0;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const HeaderText = styled.Text`
  color: #00aaf0;
  font-size: 20px;
`;

export const GeoContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

export const Room = styled.Text`
  opacity: 0.6;
  color: white;
  font-size: 13px;
  font-family: 'Roboto-Regular';
  letter-spacing: 0.3px;
`;

export const GeoIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin: 0 3px 0 -2px;
`;

export const StarIconImg = styled.Image`
  
`;

export const StarIconTouchable = styled.TouchableOpacity`
  
`;

export const ScheduleContainer = styled.View`
  padding: 16px 20px;
  border: 1px solid #00aaf0;
  border-radius: 6px;
  margin-bottom: 16px;
`;
