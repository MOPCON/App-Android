import styled from 'styled-components/native';
import { scheduleCardTypeColor, darkBlue } from '../../theme/index';
import Modal from 'react-native';

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
`;

export const InfoTitle = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 30px;
  text-align: center;
  margin-bottom: 16px;
`;

export const InfoDesc = styled.Text`
  color: white;
  font-size: 16px;
  line-height: 30px;
  margin-bottom: 16px;
`;

export const Touch = styled.TouchableOpacity`
`;

export const Btn = styled.View`
  height: 60px;
  width: 100%;
  background-color: ${scheduleCardTypeColor};
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

export const BtnText = styled.Text`
  font-size: 20px;
  color: white;
`;