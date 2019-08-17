import styled from 'styled-components/native';
import { darkBlue, scheduleCardTypeColor, buttonBackground, inverseBackground } from '../../theme/index';

export const ButtonTouchable = styled.TouchableOpacity`
  align-self: ${p => p.align};
  margin-top: ${p => p.margin[0]}px;
  margin-right: ${p => p.margin[1]}px;
  margin-bottom: ${p => p.margin[2]}px;
  margin-left: ${p => p.margin[3]}px;
  padding: ${p => p.hasIcon ? '6px 8px' : '8px 14px'};
  border: 1px solid ${scheduleCardTypeColor};
  border-radius: 4px;
  background-color: ${p => {
    switch (p.color) {
      case 'normal':
        return buttonBackground;
      case 'inverse':
        return inverseBackground;
      case 'primary':
        return scheduleCardTypeColor;
      default:
        return buttonBackground;
    }
  }};
  display: flex;
  flex-direction: row;
  align-items: center;
  width: ${p => p.block ? '100%' : 'auto'};
`;
export const ButtonText = styled.Text`
  font-family: Roboto-Medium;
  letter-spacing: 1px;
  font-size: 14px;
  color: white;
`;

export const ButtonIcon = styled.Image`
  width: 22px;
  height: 22px;
  margin-right: 6px;
`;
