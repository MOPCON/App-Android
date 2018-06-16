import React, { Component } from 'react'
import { Dimensions, Image, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';

// component
import Background from './Background';
import News from './News';
import Mod from './Mod';
import Tab from '../../components/Tab/Tab';
import * as style from './style';

// image
import mopconLogo from '../../images/mopconLogo01.png';
import iconSchedule from '../../images/icon/iconSchedule.png';
import iconMySchedule from '../../images/icon/iconMySchedule.png';
import iconUnconference from '../../images/icon/iconUnconference.png';
import iconMission from '../../images/icon/iconMission.png';
import iconSpeakers from '../../images/icon/iconSpeakers.png';
import iconCommunity from '../../images/icon/iconCommunity.png';
import iconNews from '../../images/icon/iconNews.png';

const { height, width } = Dimensions.get('window');
const tabs = ['中文', 'English'];
const defaultActiveTab = '中文';

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
      <style.CarouselItem width={width}  source={{ uri: item }} />
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
      <style.Container>
        <Background />
        <style.ScrollContainer>
          <style.ViewContainer>
            <style.LogoContainer>
              <Image source={mopconLogo}/>
            </style.LogoContainer>
            <style.CarouselContainer>
              <Carousel
                sliderWidth={width}
                itemWidth={width - 80}
                data={images}
                renderItem={this.renderItem}
              />
            </style.CarouselContainer>
            <style.Content>
              <News />
              <style.ModContainer>
                { mods.map(mod => <Mod navigate={() => this.navigate(mod.screen)} {...mod} />) }
              </style.ModContainer>
            </style.Content>
            <style.TabContainer>
              <Tab tabs={tabs} defaultActiveTab={defaultActiveTab} />
            </style.TabContainer>
          </style.ViewContainer>
        </style.ScrollContainer>
      </style.Container>
    )
  }
}
