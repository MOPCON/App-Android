import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { darkBlue, SpeakerCardBackground } from '../../theme/index';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const SpeakerScrollView = styled.ScrollView`
  background-color: ${darkBlue};
`;
