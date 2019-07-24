import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

export const SDContainer = styled.View`
  background-color: ${darkBlue};
  flex: 1;
`;
export const SDScrollView = styled.ScrollView``;
export const HeaderImage = styled.Image`
  width: 100%;
  height: 200px;
  background-color: #ccc;
`;
export const IntroContainer = styled.View`
  padding: 16px;
`;
export const DesText = styled.Text`
  color: white;
  font-size: 16px;
  letter-spacing: 0.3px;
  line-height: 22px;
  font-family: 'Roboto-Regular';
  text-align: justify;
`;

export const SpeechItemContainer = styled.View`
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: white;
  font-size: 18px;
`;

export const JobText = styled.Text`
  font-size: 16px;
  color: #878787;
`;

export const Row = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
`;
export const RowSpace = styled.View`
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StarIconImg = styled.Image`
  margin-left: auto;
`;

export const StarIconTouchable = styled.TouchableOpacity`
  
`;