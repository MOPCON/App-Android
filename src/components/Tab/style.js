import styled from 'styled-components/native';
import { aquamarineTwo, scheduleCardTypeColor, darkBlue } from '../../theme/index';
import { Animated } from 'react-native';

export const TabContainer = styled.View`
  height: 28px;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 16px;
  position: relative;
  flex-direction: row;
  border: 1px solid #FFCC00;
`;

export const TouchArea = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${p => p.isActive ? '#FFCC00' : 'transparent'};
`;

export const TabText = styled.Text`
  color: ${p => (p.isActive ? darkBlue : '#FFCC00')};
  font-size: 12px;
  letter-spacing: 0.6px;
  font-family: Roboto-Medium;
`;