import styled from 'styled-components/native';
import {
  darkBlue, scheduleCardTypeColor, scheduleCardBackground,
} from '../../theme/index';

export const NewsContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
  flex-grow:1;
`;

export const NewsCardView = styled.View`
  background: ${scheduleCardBackground};
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const NewsTimeText = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 12px;
  margin-bottom: 8px;
`;

export const NewsCardTitleText = styled.Text`
  color: white;
  font-size: 20px;
  margin-bottom: 8px;
`;

export const NewsCardDescText = styled.Text`
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
`;
