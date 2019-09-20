import styled from 'styled-components/native';
import { darkBlue, scheduleCardTypeColor } from '../../theme/index';

export const SDContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
  flex-grow:1;
  align-items: center;
`;

export const CardView = styled.View`
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CardImg = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
`;

export const SponsorName = styled.Text`
  color: white;
  font-family: 'Roboto-Medium';
  font-size: 16px;
  letter-spacing: 2.7px;
  margin-bottom: 20px;
  text-align: center;
`;

export const SponsorDesc = styled.Text`
  color: white;
  font-family: 'Roboto-Regular';
  font-size: 14px;
  line-height: 22px;
  text-align: justify;
  letter-spacing: 0.3px;
  margin-bottom: 50px;
`;

export const MoreButton = styled.TouchableOpacity`
  width: 172px;
  align-items: center;
  justify-content: flex-start;
  padding: 13px 40px;
  border: 1px solid #00aaf0;
  border-radius: 6px;
`;

export const SplitText = styled.Text`
  color: white;
  font-family: 'Roboto-Regular';
  font-size: 14px;
  letter-spacing: 0.3px;
  margin-bottom: 16px;
  width: 100%;
  justify-content: flex-start;
  flex-direction: row;
`;

export const MoreText = styled.Text`
  font-size: 16px;
  color: #00aaf0;
`;
