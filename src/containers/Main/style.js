import styled from 'styled-components/native';
import * as theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.darkBlue};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      paddingTop: 10,
    }
  }
})``;

export const LogoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
  align-items: center;
`;

export const CarouselContainer = styled.ScrollView`
  margin-bottom: 16px;
`;

export const NewsContainer = styled.View`
  margin-bottom: 32px;
`;

export const CarouselItem = styled.Image`
  padding: 100px 100px;
  width: ${props => props.width};
  height: 168px;
  margin-right: 16px;
`;

export const Content = styled.View`
  width: 100%;
  padding-left: 20;
  padding-right: 20;
`;

export const ModContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const TabContainer = styled.View`
  width: 50%;
`;

export const CarouselTitle = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
  padding: 0 20px;
`;