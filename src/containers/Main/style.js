import styled from 'styled-components/native';
import * as theme from '../../theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.darkBlue};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      paddingTop: 62,
    }
  }
})``;

export const ViewContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const LogoContainer = styled.View`
  margin-bottom: 25;
`;

export const CarouselContainer = styled.ScrollView`
  margin-bottom: 16px;
  height: 168px;
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