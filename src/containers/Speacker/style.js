import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { darkBlue, SpeakerCardBackground } from '../../theme/index';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const SpeakerScrollView = styled.ScrollView`
  background-color: ${darkBlue};
`;


export const SpeakerContainer = styled.View`
  background-color: ${darkBlue};
  height: 100%;
  padding: 16px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  background: ${SpeakerCardBackground};
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 24px 16px;
`;