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
  width: 90%;
  height: auto;
  border-radius: 20px;
  background-color: ${darkBlue};
  padding: 48px 30px 24px 30px;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffcc00;
`;

export const InfoTitle = styled.Text`
  color: #fff;
  font-size: 22px;
  text-align: center;
  margin-bottom: 16px;
`;

export const InfoDesc = styled.Text`
  color: white;
  font-size: 18px;
  line-height: 30px;
  margin-bottom: 60px;
`;

export const Touch = styled.TouchableOpacity`
`;

export const Btn = styled.View`
  width: 170px;
  height: 60px;
  background-color: ${scheduleCardTypeColor};
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const BtnText = styled.Text`
  font-size: 20px;
  color: ${darkBlue};
`;

export const WelcomeImage = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
`;
