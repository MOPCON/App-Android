import React from 'react';
import {
  Dimensions, TouchableOpacity, Linking
} from 'react-native';
import I18n from '../../locales';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import TopicScheduleItem from '../TopicScheduleItem/TopicScheduleITem';


const { width } = Dimensions.get('window');

export const CarouselContainer = styled.ScrollView`
  margin-bottom: 16px;
`;

export const CarouselTitle = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
  padding: 0 20px;
`;

const openLink = (url) => () => {
  Linking.openURL(url);
}

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity onPress={openLink(item.link)}>
      <TopicScheduleItem />
    </TouchableOpacity>
  );
}

const TopicCarousel = () => {
  const carousel = [1, 2, 3, 4];
  return (
    <React.Fragment>
      <CarouselTitle>{I18n.t('schedule.hotTopic')}</CarouselTitle>
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

export default TopicCarousel;
