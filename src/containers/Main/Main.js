import React, { Component } from 'react'
import { Dimensions, Image } from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import * as theme from '../../theme';
import Background from './Background';
import News from './News';
import Mod from './Mod';

import mopconLogo from '../../images/mopconLogo01.png';
import iconSchedule from '../../images/icon/iconSchedule.png';
import iconMySchedule from '../../images/icon/iconMySchedule.png';
import iconUnconference from '../../images/icon/iconUnconference.png';
import iconMission from '../../images/icon/iconMission.png';
import iconSpeakers from '../../images/icon/iconSpeakers.png';
import iconCommunity from '../../images/icon/iconCommunity.png';
import iconNews from '../../images/icon/iconNews.png';

const { height, width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${theme.darkBlue};
`;

const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      marginTop: 62,
      alignItems: 'center',
      paddingBottom: 60,
    }
  }
})``;

const LogoContainer = styled.View`
  margin-bottom: 25;
`;

const CarouselContainer = styled.View`
  height: 168;
  margin-bottom: 15;
`;

const CarouselItem = styled.Image`
  width: ${width - 80};
  height: 168;
`;

const Content = styled.View`
  width: 100%;
  padding-left: 20;
  padding-right: 20;
`;

const ModContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
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
    mods: [
      { icon: iconSchedule, name: '議程', screen: 'Schedule' },
      { icon: iconMySchedule, name: '我的行程' },
      { icon: iconUnconference, name: '交流場次' },
      { icon: iconMission, name: '任務' },
      { icon: iconSchedule, name: '贊助廠商' },
      { icon: iconSpeakers, name: '講者' },
      { icon: iconCommunity, name: '社群' },
      { icon: iconNews, name: '最新消息' },
    ]
  }

  renderItem = ({item, index}) => {
    return (
      <CarouselItem  source={{ uri: item }} />
    );
  }

  navigate = (screen) => {
    if (screen) {
      this.props.navigate(screen);
    }
  }

  render() {
    const { images, mods } = this.state;

    return (
      <Container>
        <Background />
        <ScrollContainer>
          <LogoContainer>
            <Image source={mopconLogo}/>
          </LogoContainer>
          <CarouselContainer>
            <Carousel
              sliderWidth={width}
              itemWidth={width - 80}
              data={images}
              renderItem={this.renderItem}
            />
          </CarouselContainer>
          <Content>
            <News />
            <ModContainer>
              { mods.map(mod => <Mod navigate={() => this.navigate(mod.screen)} {...mod} />) }
            </ModContainer>
          </Content>
        </ScrollContainer>
      </Container>
    )
  }
}
