import styled from 'styled-components/native';
import { darkBlue, scheduleCardTypeColor, buttonBackground, inverseBackground } from '../../theme/index';

export const ButtonTouchable = styled.TouchableOpacity`
  align-self: ${p => p.align};
  margin-top: ${p => p.margin[0]}px;
  margin-right: ${p => p.margin[1]}px;
  margin-bottom: ${p => p.margin[2]}px;
  margin-left: ${p => p.margin[3]}px;
  padding: ${p => p.hasIcon ? '6px 8px' : '8px 14px'};
  border: 1px solid;
  border-radius: 4px;
  background-color: ${p => {
    switch (p.color) {
      case 'normal':
        return buttonBackground;
      case 'inverse':
        return inverseBackground;
      case 'disabled':
        return 'transparent';
      case 'primary':
        return scheduleCardTypeColor;
      default:
        return buttonBackground;
    }
  }};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${p => p.block ? '100%' : 'auto'};
  opacity: ${p => p.disabled ? '0.5' : '1'};
`;

export const OutlineButtonTouchable = styled(ButtonTouchable)`
  border-color: ${p => {
    switch (p.color) {
      case 'disabled':
        return '#848a8e';
      default:
        return scheduleCardTypeColor;
    }
  }};
`;

export const FilledButtonTouchable = styled(ButtonTouchable)`
  padding: 16px 48px;
  border-radius: 6px;
  background-color: ${p => {
    switch (p.color) {
      case 'normal':
        return buttonBackground;
      case 'inverse':
        return inverseBackground;
      case 'disabled':
        return '#848a8e';
      case 'primary':
        return scheduleCardTypeColor;
      default:
        return buttonBackground;
    }
  }};
`;

export const ButtonText = styled.Text`
  font-family: Roboto-Medium;
  letter-spacing: 1px;
  font-size: 14px;
`;

export const OutlineButtonText = styled(ButtonText)`
  color: ${p => {
    switch (p.color) {
      case 'inverse':
        return 'white';
      case 'disabled':
        return '#848a8e';
      default:
        return '#000';
    }
  }};
`;

export const FilledButtonText = styled(ButtonText)`
  font-weight: bold;
  color: ${p => {
    switch (p.color) {
      case 'inverse':
        return 'white';
      case 'disabled':
        return '#000';
      default:
        return '#000';
    }  
  }}
`;


export const ButtonIcon = styled.Image`
  width: 22px;
  height: 22px;
  margin-right: 6px;
`;
