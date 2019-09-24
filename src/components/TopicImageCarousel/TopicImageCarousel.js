import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions, TouchableOpacity, Linking
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components/native';

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
    <TouchableOpacity onPress={() => { Linking.openURL(item.link) }}>
      <Img source={{ uri: item.img }} resizeMode="cover" />
    </TouchableOpacity>
  );
};

const TopicImageCarousel = ({ banner }) => {
  return (
    <React.Fragment>
      <CarouselContainer>
        <Carousel
          inactiveSlideScale={0.94}
          sliderWidth={width}
          itemWidth={width - 40}
          data={banner}
          renderItem={renderItem}
        />
      </CarouselContainer>
    </React.Fragment>
  );
};

TopicImageCarousel.propTypes = {
  banner: PropTypes.arrayOf(PropTypes.shape({
    img: PropTypes.string,
    link: PropTypes.string,
  })),
};

TopicImageCarousel.defaultProps = {
  banner: [],
};

export default TopicImageCarousel;