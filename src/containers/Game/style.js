import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  darkBlue, modBorder,
} from '../../theme/index';

const width = (Dimensions.get('window').width - (20 + 20 + 16)) / 2;

export const GameContainer = styled.View`
  background-color: ${darkBlue};
  flex-grow:1;
  padding: 20px;
`;

export const ScrollContainer = styled.ScrollView`
`;