import styled from 'styled-components/native';
import { darkBlue, scheduleCardTypeColor } from '../../theme/index';

export const SDContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
  flex-grow:1;
`;

export const CardView = styled.View`
  width: 100%;
  height: 165px;
  background: white;
  border-radius: 10px;
  margin-bottom: 24px;
`;

export const CardImg = styled.Image`

`;

export const SponsorName = styled.Text`
  color: ${scheduleCardTypeColor};
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
  margin-bottom: 16px;
`;