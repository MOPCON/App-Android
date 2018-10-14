import styled from 'styled-components/native';
import { scheduleCardTypeColor, darkBlue } from '../../theme/index';

export const ModalContainer = styled.Modal`
`;

export const BodyContainer = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

export const InfoContainer = styled.View`
  width: 340px;
  height: auto;
  border: 2px solid ${scheduleCardTypeColor};
  border-radius: 4px;
  background-color: ${darkBlue};
  padding: 16px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  border-bottom-color: ${scheduleCardTypeColor};
  border-bottom-width: 1px;
  border-style: solid;
  color: ${scheduleCardTypeColor};
  width: 100%;
`;

export const ButtonsContainer = styled.View`
  display: flex;
  justify-content: center;
  flex-direction: row;
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
  width: 50px;
  height: 50px;
  margin-bottom: 16px;
`;