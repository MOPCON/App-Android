import styled from 'styled-components/native';
import * as theme from '../../theme';

export const Container = styled.View`
  background-color: ${theme.darkBlue};
  flex: 1;
  padding: 16px;
  display: flex;
  align-items: center;
`;

export const Card = styled.View`
  width: 100%;
  height: 164px;
  border-radius: 10px;
  margin-bottom: 24px;
  background: white;
`;

export const Title = styled.Text`
  color: ${theme.scheduleCardTypeColor};
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 2.7px;
  margin-bottom: 16px;
`;

export const Content = styled.Text`
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.3px;
  margin-bottom: 32px;
`;

export const BtnContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const Btn = styled.TouchableOpacity`
  margin-right: 16px;
`;

export const BtnImage = styled.Image`
`;
