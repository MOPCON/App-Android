import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { darkBlue, SpeakerCardBackground } from '../../theme/index';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const SpeakerScrollView = styled.ScrollView`
  padding: 16px;
  background-color: ${darkBlue};
`;

export const ItemContainer = styled.View`
  height: 100;
  margin-bottom: 24;
`;

export const Intro = styled.Text`
  color: #fff;
  font-size: 14;
  letter-spacing: 1;
  line-height: 22;
  margin-bottom: 28;
`;