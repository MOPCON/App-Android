import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import {
  darkBlue, scheduleCardTypeColor,
} from '../../theme/index';

const width = (Dimensions.get('window').width - (20 + 20 + 16)) / 2;

export const Container = styled.View`
  background-color: ${darkBlue};
  flex-grow:1;
  padding: 20px;
`;

export const ScrollContainer = styled.ScrollView`
`;

export const StageImage = styled.Image`
  width: 100%;
  height: 96px;
  border: 1px solid ${scheduleCardTypeColor};
  border-radius: 6px;
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 22px;
  margin-bottom: 16px;
`;

export const Content = styled.Text`
  color: #fff;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 80px;
`;