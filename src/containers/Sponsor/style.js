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
  height: ${width};
  border-radius: 10px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;
export const CardImgSmall = styled.Image`

`;
export const CardImgBig = styled.Image`

`;
export const TypeText = styled.Text`
  color: ${scheduleCardTypeColor};
  font-family: 'Roboto-Medium';
  font-size: 16px;
  letter-spacing: 2.7px;
  margin-bottom: 16px;
  text-align: center;
`;
