import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  darkBlue, modBorder,mariGold
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
  width:90%;
  margin: 20px 5% 30px 5%;
  flex-direction: column;
  align-items: center;
`

export const UserIcon = styled.Image`
  width: 100px;
  height: 100px;
  margin: 0px 0px 20px 0px;
`;

export const TotalText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const ScoreText = styled.Text`
  color: #ffcc00;
  font-size: 20px;
  margin-left: 10px;
`;

export const ProgressTitleText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const ProgressContainer = styled.View`
  width: 100%;
  margin: 10px 0px 0px 0px; 
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ProgressBar = styled.View`
  width:40%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

export const ProgressGift = styled.Image`
  width: 100%;
  height: 20px;
`

export const ProgressText = styled.Text`
  font-size: 16px;
  margin-left: 10px;
`;

export const PuzzleContainer = styled.FlatList`
  width: 90%;
  margin: 0px 5%;
`

export const PuzzleBlock = styled.TouchableHighlight`
  width:25%;
  height:110px;
  border:0.5px solid ${darkBlue};
`;

export const PuzzlePng = styled.Image`
  width:100%;
  height:110px;
`