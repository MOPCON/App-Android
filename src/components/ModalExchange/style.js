import styled from 'styled-components/native';
import { scheduleCardTypeColor, darkBlue } from '../../theme/index';

const darkGray = 'rgba(255, 204, 0, 0.24)';
const RewardModalTypeColor = '#ffcc00';
const RewardModalTypeBg = '#001333';

export const ModalContainer = styled.Modal`
`;

export const BodyContainer = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled.View`
  width: 90%;
  height: auto;
  border: 1px solid ${RewardModalTypeColor};
  border-radius: 20px;
  background-color: ${RewardModalTypeBg};
  padding: 48px 30px 35px 30px;
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  color: #fff;
  width: 100%;
  height: 60px;
  background-color: ${darkGray};
  border-radius: 8px;
  margin-bottom: 24px;
  text-align: center;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ExchangeText = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 24px;
`;

export const ExchangeCoinText = styled.Text`
  color: white;
  font-size: 24px;
`;

export const ExchangePng = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
`;

export const ExchangeTitle = styled.Text`
  color: #fff;
  font-size: 22px;
  margin-bottom: 24px;
`;
