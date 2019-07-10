import React, { Component } from 'react'
import {
  Dimensions, Image, View, TouchableOpacity, Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import SplashScreen from 'react-native-splash-screen';
import I18n from '../../locales';

// component
import Background from './Background';
import News from './News';
import Mod from './Mod';
import LangSelect from '../../components/LangSelect/LangSelect';
import TopicScheduleItem from '../../components/TopicScheduleItem/TopicScheduleITem';
import * as Style from './style';

// image
import mopconLogo from '../../images/logo.png';
import iconSchedule from '../../images/icon/iconSchedule.png';
import iconMySchedule from '../../images/icon/iconMySchedule.png';
import iconUnconference from '../../images/icon/iconUnconference.png';
import iconMission from '../../images/icon/iconMission.png';
import iconSponsor from '../../images/icon/iconSponsor.png';
import iconSpeakers from '../../images/icon/iconSpeakers.png';
import iconCommunity from '../../images/icon/iconCommunity.png';
import iconNews from '../../images/icon/iconNews.png';

const { height, width } = Dimensions.get('window');
const tabs = [
  { name: '中文', value: 'zh' },
  { name: 'English', value: 'en' }
];

export default class Main extends Component {

  constructor(p) {
    super(p);

    this.state = {
      carousel: [1, 2, 3, 4],
      news: [{}],
      mods: [
        { icon: iconSchedule, name: 'home.schedule', screen: 'Schedule' },
        { icon: iconMySchedule, name: 'home.MySchedule', screen: 'MySchedule' },
        { icon: iconUnconference, name: 'home.Unconference', screen: 'UnConf' },
        { icon: iconMission, name: 'home.Mission', screen: 'Missiontable' },
        { icon: iconSponsor, name: 'home.Sponsors', screen: 'Sponsor' },
        { icon: iconSpeakers, name: 'home.Speakers', screen: 'Speaker' },
        { icon: iconCommunity, name: 'home.Community', screen: 'Community' },
        { icon: iconNews, name: 'home.News', screen: 'News' },
      ],
    };
  }

  async componentDidMount() {
    const newsText = await AsyncStorage.getItem('news');

    this.setState({
      news: JSON.parse(newsText).payload,
    });

    SplashScreen.hide();
  }

  openLink = (url) => () => {
    Linking.openURL(url);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={this.openLink(item.link)}>
        <TopicScheduleItem />
      </TouchableOpacity>
    );
  }

  navigate = (screen) => {
    if (screen) {
      this.props.navigation.navigate(screen);
    }
  }

  onScroll = (e) => {
    clearTimeout(this.scrollTimeout)
    const x = e.nativeEvent.contentOffset.x;
    this.scrollTimeout = setTimeout(this.onScrollEnd.bind(this, x), 250);
  }

  onScrollEnd = (x) => {
    const picWidth = width - 80;
    const round = Math.round(x / picWidth);
    const offset = (round * picWidth) + (round * 16) - 20;
    this.scrollView.scrollTo({ x: offset })
  }

  render() {
    const { language, onChangeLanguage } = this.props;
    const { carousel, mods, news } = this.state;

    return (
      <Style.Container>
        <Style.ScrollContainer>
          <Style.Content>
            <Style.LogoContainer>
              <Image source={mopconLogo} />
              <LangSelect language={language} onChange={onChangeLanguage} />
            </Style.LogoContainer>
            <Style.NewsContainer>
              <News news={news} toNews={() => this.navigate('News')} />
            </Style.NewsContainer>
          </Style.Content>
          <Style.CarouselTitle>你最想聽的演講要開始了</Style.CarouselTitle>
          <Style.CarouselContainer>
            <Carousel
              inactiveSlideScale={0.94}
              sliderWidth={width}
              itemWidth={width - 40}
              data={carousel}
              renderItem={this.renderItem}
            />
          </Style.CarouselContainer>
        </Style.ScrollContainer>
      </Style.Container>
    )
  }
}
