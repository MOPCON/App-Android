import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { darkBlue, SpeakerCardBackground } from '../../theme/index';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const SpeakerContainer = styled.ScrollView`
  padding: 16px;
  background-color: ${darkBlue};
`;

export const ItemContainer = styled.View`
  position: relative;
  margin-bottom: 24;
`;

// resize-mode: stretch;
export const SpeakerPicture = styled.Image`
  width: ${Dimensions.get('window').width};
  height: 180px;
`;

export const InfoView = styled.View`
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #0c344a;
  opacity: 0.8;
  align-items: center;
  justify-content: center;
`;

export const SpeakerText = styled.Text`
  font-size: 16px;
  color: #fff;
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
  margin-bottom: 28;
  padding-bottom: 40;
  border-bottom-width: 1px;
  border-bottom-color: #878787;
`;