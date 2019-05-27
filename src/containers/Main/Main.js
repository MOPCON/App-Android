import React, { Component } from 'react'
import {
  Dimensions, NativeModules, Platform,
  Image, View, TouchableOpacity,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
// import SplashScreen from 'react-native-splash-screen';
import I18n from '../../locales';

// component
import Background from './Background';
import News from './News';
import Mod from './Mod';
import Tab from '../../components/Tab/Tab';
import * as Style from './style';

// image
import mopconLogo from '../../images/mopconLogo01.png';
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

const getLanguageCode = () => {
  let systemLanguage = 'en';
  if (Platform.OS === 'android') {
    systemLanguage = NativeModules.I18nManager.localeIdentifier;
  } else {
    systemLanguage = NativeModules.SettingsManager.settings.AppleLocale;
  }
  const languageCode = systemLanguage.substring(0, 2);
  return languageCode;
}

export default class Main extends Component {

  constructor(p) {
    super(p);
    const language = getLanguageCode();
    I18n.locale = language;
    this.state = {
      carousel: [],
      news: [],
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
      language,
    };
  }

  async componentDidMount() {
    const carouselText = await AsyncStorage.getItem('carousel');
    const newsText = await AsyncStorage.getItem('news');

    this.setState({
      carousel: JSON.parse(carouselText).payload,
      news: JSON.parse(newsText).payload,
    });

    // SplashScreen.hide();
  }

  openLink = (url) => () => {
    Linking.openURL(url);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={this.openLink(item.link)}>
        <Style.CarouselItem width={width} source={{ uri: item.banner }} />
      </TouchableOpacity>
    );
  }

  navigate = (screen) => {
    if (screen) {
      this.props.navigate(screen);
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

  onChangeLanguage = (language) => {
    I18n.locale = language;

    this.setState({
      language,
    });
  }

  render() {
    const { carousel, mods, language, news } = this.state;

    return (
      <Style.Container>
        <Background />
        <Style.ScrollContainer>
          <Style.ViewContainer>
            <Style.LogoContainer>
              <Image source={mopconLogo} />
            </Style.LogoContainer>
            <Style.CarouselContainer>
              <Carousel
                inactiveSlideScale={0.94}
                sliderWidth={width}
                itemWidth={width - 40}
                data={carousel}
                renderItem={this.renderItem}
              />
            </Style.CarouselContainer>
            <Style.Content>
              <News news={news} toNews={() => this.navigate('News')}/>
              <Style.ModContainer>
                {mods.map((mod, index) => <Mod key={`mod_${index}`} navigate={() => this.navigate(mod.screen)} {...mod} />)}
              </Style.ModContainer>
            </Style.Content>
            <Style.TabContainer>
              <Tab tabs={tabs} defaultActiveTab={language} onChange={this.onChangeLanguage} />
            </Style.TabContainer>
          </Style.ViewContainer>
        </Style.ScrollContainer>
      </Style.Container>
    )
  }
}
