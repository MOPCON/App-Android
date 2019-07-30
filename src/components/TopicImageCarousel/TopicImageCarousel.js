import React from 'react';
import {
  Dimensions, TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import img from '../../images/topic.png';

const { width } = Dimensions.get('window');

export const CarouselContainer = styled.ScrollView`
  margin-bottom: 16px;
`;

export const Img = styled.Image`
  height: 85px;
  width: 100%;
  border-radius: 6px;
`;

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity>
      <Img source={img} resizeMode="cover"/>
    </TouchableOpacity>
  );
};

const TopicImageCarousel = () => {
  const carousel = [1, 2, 3, 4];
  return (
    <React.Fragment>
      
      <CarouselContainer>
        <Carousel
          inactiveSlideScale={0.94}
          sliderWidth={width}
          itemWidth={width - 40}
          data={carousel}
          renderItem={renderItem}
        />
      </CarouselContainer>
    </React.Fragment>
  );
};

export default TopicImageCarousel;