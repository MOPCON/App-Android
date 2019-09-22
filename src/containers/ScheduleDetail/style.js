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
`;

export const Title = styled.Text`
  color: white;
  font-size: 18px;
  margin-bottom: 16px;
`;

export const JobText = styled.Text`
  font-size: 12px;
  color: #878787;
`;

export const NameText = styled.Text`
  font-size: 16px;
  color: white;
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
  margin-right: 20px;
`;

export const SpeakerImg = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-bottom: 10px;
`;

export const SpeakerContainer = styled.View`
  align-items: center;
  margin: 24px 0;
`;

export const CategoryText = styled.Text`
  font-size: 12px;
  color: #00aaf0;
`;

export const Line = styled.View`
  width: 100%;
  height: 0px;
  border: 1px solid #878787;
  margin: 40px 0;
`
export const SponsorText = styled.Text`
  margin: 40px 0;
  color: #878787;
  font-size: 16px;
`;

export const CardSmall = styled.View`
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const CardImg = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin-bottom: 10px;
`;

export const CardText = styled.Text`
  font-size: 16px;
  color: white;
`;

export const ImgList = styled.View`
  flex-direction: row;
  justify-content: center;
`;