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

export const logo = styled.Image`
  width: 80;
  height: 80;
  border-radius: 80;
  margin-top: 30px;
  margin-bottom: 25px;
  background: #fff;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 2.7px;
  margin-bottom: 16px;
`;

export const Content = styled.Text`
  color: #fff;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.3px;
  margin-bottom: 70px;
`;

export const MoreButton = styled.TouchableOpacity`
  width: 172px;
  align-items: center;
  justify-content: flex-start;
  padding: 13px 40px;
  border: 1px solid #00aaf0;
  border-radius: 6px;
`;

export const MoreText = styled.Text`
  font-size: 16px;
  color: #00aaf0;
`;
