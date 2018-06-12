import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image
} from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import * as theme from '../../theme';
import Background from './Background';
import mopconLogo from '../../images/mopconLogo01.png';

const { height, width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${theme.darkBlue};
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      marginTop: 62,
      flex: 1,
      alignItems: 'center',
    }
  }
})``;

const LogoContainer = styled.View`
  margin-bottom: 25;
`;

const CarouselItem = styled.Image`
  width: 300;
  height: 168;
`;

export default class Main extends Component {
  state = {
    images: [
      'https://unsplash.it/300/?random',
      'https://unsplash.it/350/?random',
      'https://unsplash.it/400/?random',
      'https://unsplash.it/450/?random',
      'https://unsplash.it/500/?random',
      'https://unsplash.it/550/?random',
      'https://unsplash.it/600/?random'
    ],
  }

  renderItem = ({item, index}) => {
    return (
      <CarouselItem  source={{ uri: item }} />
    );
  }

  render() {
    return (
      <Container>
        <Background />
        <Content>
          <LogoContainer>
            <Image source={mopconLogo}/>
          </LogoContainer>
          <Carousel
            firstItem={1}
            sliderWidth={width}
            itemWidth={300}
            data={this.state.images}
            renderItem={this.renderItem}
          />
        </Content>
      </Container>
    )
  }
}
