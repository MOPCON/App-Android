import styled from 'styled-components/native';
import {
  darkBlue, scheduleCardTypeColor,
} from '../../theme/index';

export const RewardContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
  flex-grow:1;
`;

export const RewardCard = styled.View`
  height: 168px;
  border: 1px solid ${scheduleCardTypeColor};
  border-radius: 6px;
  padding: 16px 20px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RewardImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  background: #fff;
  margin-right: 20px;
`;

export const RewardInfo = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: space-around;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #fff;
  margin-bottom: 15px;
`;

export const Desc = styled.Text`
  font-size: 14px;
  color: #878787;
  margin-bottom: 15px;
`;