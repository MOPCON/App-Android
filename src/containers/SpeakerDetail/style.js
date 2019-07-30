import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { darkBlue, SpeakerCardBackground } from '../../theme/index';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const SpeakerContainer = styled.ScrollView`
  padding: 16px;
  background-color: ${darkBlue};
`;

export const ItemContainer = styled.View`
  align-items: center;
  margin-top: 33px;
  margin-bottom: 33px;
`;

// resize-mode: stretch;
export const SpeakerPicture = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin-bottom: 8px;
`;

export const SpeakerText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const TitleText = styled.Text`
  font-size: 13px;
  color: #878787;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const ReadMoreView = styled.TouchableOpacity`

`;

export const ReadMoreText = styled.Text`
  font-size: 16px;
  color: #878787;
`;

export const Intro = styled.Text`
  color: #fff;
  font-size: 16;
  letter-spacing: 1;
  line-height: 24;
  margin-bottom: 40;
`;