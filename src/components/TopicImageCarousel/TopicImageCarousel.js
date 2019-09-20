import React, { useEffect, useState } from 'react';
import {
  Dimensions, TouchableOpacity, Linking
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import apiServices from '../../api/services';

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

const TopicImageCarousel = () => {
  const [banner, setBanner] = useState([]);
  const getBanner = async () => {
    const { data } = await apiServices.get('/home');
    setBanner(data.banner);
  }
  useEffect(() => {
    getBanner();
  }, [])
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

export default TopicImageCarousel;