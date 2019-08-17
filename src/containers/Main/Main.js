import React, { Component } from 'react'
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from 'react-native-splash-screen';

// component
import News from './News';
import LangSelect from '../../components/LangSelect/LangSelect';
import TopicScheduleCarousel from '../../components/TopicScheduleCarousel/TopicScheduleCarousel';
import TopicImageCarousel from '../../components/TopicImageCarousel/TopicImageCarousel';
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
    // const newsText = await AsyncStorage.getItem('news');

    // this.setState({
    //   news: JSON.parse(newsText).payload,
    // });
    SplashScreen.hide();
  }

  navigate = (screen) => {
    if (screen) {
      this.props.navigation.navigate(screen);
    }
  }

  render() {
    const { language, onChangeLanguage } = this.props;
    const { news } = this.state;

    return (
      <Style.Container>
        <Style.ScrollContainer>
          <Style.Content>
            <Style.LogoContainer>
              <Image style={{ width: 200, height: 40 }} resizeMode="contain" source={mopconLogo} />
              <LangSelect language={language} onChange={onChangeLanguage} />
            </Style.LogoContainer>
          </Style.Content>
          <TopicImageCarousel />
          <Style.Content>
            <Style.NewsContainer>
              <News news={news} toNews={() => this.navigate('News')} />
            </Style.NewsContainer>
          </Style.Content>
          <TopicScheduleCarousel />
        </Style.ScrollContainer>
      </Style.Container>
    )
  }
}
