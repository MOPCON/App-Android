import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  darkBlue, modBorder,
} from '../../theme/index';

const width = (Dimensions.get('window').width - (20 + 20 + 16)) / 2;

export const GameContainer = styled.View`
  
  flex-grow:1;
  padding: 20px;
`;

export const ScrollContainer = styled.ScrollView`
  background-color: ${darkBlue};
`;

export const ProfileContainer = styled.View`
  margin: 20px 0 30px 0;
  flex-direction: row;
`;

export const UserIcon = styled.Image`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

export const TotalText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const ScoreText = styled.Text`
  color: #fff;
  font-size: 32px;
`;

export const ProgressTitleText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const ProgressText = styled.Text`
  color: #fff;
  font-size: 16px;
`;