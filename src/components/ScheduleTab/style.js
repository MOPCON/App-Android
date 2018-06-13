import styled from 'styled-components/native';
import { aquamarineTwo, scheduleCardTypeColor } from '../../theme/index';

export const TabContainer = styled.View`
  background-color: ${aquamarineTwo};
  height: 34px;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
  position: relative;
`;

export const TabActiveItem = styled.View`
  background-color: #004C67;
  border-radius: 6px;
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  left: ${p => p.isFirstDay ? '0' : '50%'};
  z-index: 1;
`;

export const TextContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
`;

export const TouchArea = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TabText = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 16px;
  letter-spacing: 0.6px;
  font-family: Roboto-Medium;
  opacity: ${p => p.isFirstDay ? '1' : '0.5'};
`;