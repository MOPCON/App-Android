import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  darkBlue, modBorder,
} from '../../theme/index';

const width = (Dimensions.get('window').width - (20 + 20 + 16)) / 2;

export const MissionContainer = styled.View`
  background-color: ${darkBlue};
  flex-grow:1;
  padding: 20px;
`;

export const ScrollContainer = styled.ScrollView`
`;

export const ExchangeZone = styled.View`
  height: 193px;
  margin-bottom: 16px;
`;

export const MissionZone = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Box = styled.View`
  width: ${props => props.width || width};
  height: ${props => props.height || width};
  border: 1px solid ${modBorder};
  border-radius: 8px;
  background-color: #002a51;
  margin-bottom: 16px;
`;