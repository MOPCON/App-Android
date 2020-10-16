import styled from 'styled-components/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  aquamarine, darkBlue, scheduleCardBackground,
  scheduleCardTypeColor,
} from '../../theme/index';

export const ScheduleItemContainer = styled.View`
  align-items: flex-start;
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

export const Title = styled.Text`
  color: white;
  font-size: 18px;
  font-family: 'Roboto-Regular';
  margin-bottom: 16px;
  max-width: 100%;
`;

export const NTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
  font-size: 18px;
  width: 100%;
  text-align: center;
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
  align-items: center;
`;

export const HeaderText = styled.Text`
  color: #FFCC00;
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

export const ScheduleContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #FFCC00;
  border-radius: 6px;
  margin-bottom: 16px;
`;

export const InnerTagContainer = styled.View`
  display: flex;
  flex-wrap: wrap;
  width: 105%;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: -5px;
  margin-bottom: 10px;
`;
