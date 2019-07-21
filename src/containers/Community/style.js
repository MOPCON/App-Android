import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import * as theme from '../../theme';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.darkBlue};
  padding: 16px;
`;

export const TabContainer = styled.View`
  width: 100%;
`;

export const ScrollView = styled.ScrollView`
`;

export const BlockContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const CardSmall = styled.TouchableOpacity`
  width: ${width};
  align-items: center;
  margin-bottom: 30px;
`;
export const CardImgSmall = styled.Image`
  width: 80;
  height: 80;
  border-radius: 80;
  margin-bottom: 10px;
  background: #fff;
`;

export const CardText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const Card = styled.View`
  width: 100%;
  background: ${theme.SpeakerCardBackground};
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px;
`;

export const CardTitle = styled.Text`
  color: ${theme.scheduleCardTypeColor};
  font-size: 20px;
  margin-bottom: 8px;
`;

export const CardContent = styled.Text`
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 24px;
`;

export const MemberTitle = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-bottom: 8px;
`;

export const MemberContent = styled.Text`
  color: #fff;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.3px;
`;