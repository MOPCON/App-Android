import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { darkBlue, scheduleCardTypeColor } from '../../theme/index';

const width = (Dimensions.get('window').width - (16 * 3)) / 2;

export const SponsorContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
`;
export const SponsorScrollView = styled.ScrollView``;
export const CardSmallView = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export const CardBig = styled.TouchableOpacity`
  width: 100%;
  height: 165px;
  background: white;
  border-radius: 10px;
  margin-bottom: 30px;
`;
export const CardSmall = styled.TouchableOpacity`
  width: ${width};
  align-items: center;
  margin-bottom: 30px;
`;
export const CardImgSmall = styled.View`
  margin-bottom: 10px;
`;

export const CardText = styled.Text`
  color: #fff;
  font-size: 16px;
`;

export const CardImg = styled.Image`
  width: 80;
  height: 80;
  border-radius: 80;
  background: #fff;
`;

export const CardImgBig = styled.View`
  width: ${width};
  height: ${width};
`;
export const TypeText = styled.Text`
  color: ${scheduleCardTypeColor};
  font-size: 16px;
  letter-spacing: 2.7px;
  margin-bottom: 60px;
  text-align: center;
`;
