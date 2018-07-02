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

export const CardSmallView = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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