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
  border: 1px solid #FFCC00;
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

export const NewsTimeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const NewsTimeText = styled.Text`
  color: #FFCC00;
  font-size: 20px;
  margin-bottom: 16px;
`;

export const NewsCardTitleText = styled.Text`
  color: white;
  font-size: 18px;
  margin-bottom: 8px;
`;

export const NewsCardDescText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.3px;
  color: #878787;
`;
