import React, { Component } from 'react';
import { View, Platform, NativeModules } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import firebase from 'react-native-firebase';
import DeviceInfo from 'react-native-device-info';
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import Header from './Header';
import Main from '../Main/Main';
import Schedule from '../Schedule/Schedule';
import UnConf from '../UnConf/UnConf';
import Sponsor from '../Sponsor/Sponsor';
import ScheduleDetail from '../ScheduleDetail/ScheduleDetail';
import SponsorDetail from '../SponsorDetail/SponsorDetail';
import Speaker from '../Speaker/Speaker';
import SpeakerDetail from '../SpeakerDetail/SpeakerDetail';
import News from '../News/News';
import Community from '../Community/Community';
import CommunityDetail from '../CommunityDetail/CommunityDetail';
import VolunteerDetail from '../VolunteerDetail/VolunteerDetail';
import QRCode from '../QRCode/QRCode';
import MySchedule from '../MySchedule/MySchedule';
import QA from '../QA/QA';
// import Missiontable from '../MissionTable/Missiontable';
// import MissionDetail from '../MissionDetail/MissionDetail';
import Game from '../Game/Game';
import GameDetail from '../GameDetail/GameDetail';
import Reward from '../Reward/Reward';
import More from '../More/More';
import Page from '../../components/Page/Page';
import * as Style from './Style';
import apiServices from '../../api/services';
import gameServices from '../../api/gameServices';
import '../../utils/extends';
import Provider from '../../store';

import iconHome from '../../images/icon/iconHome.png';
import iconHomeActive from '../../images/icon/iconHomeActive.png';
import iconSchedule from '../../images/icon/iconSchedule.png';
import iconScheduleActive from '../../images/icon/iconScheduleActive.png';
import iconGame from '../../images/icon/iconGame.png';
import iconGameActive from '../../images/icon/iconGameActive.png';
import iconNews from '../../images/icon/iconNews.png';
import iconNewsActive from '../../images/icon/iconNewsActive.png';
import iconMore from '../../images/icon/iconMore.png';
import iconMoreActive from '../../images/icon/iconMoreActive.png';

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

class App extends Component {

  constructor(p) {
    super(p);

    const language = getLanguageCode();
    I18n.locale = language;

    this.state = {
      hasUpdated: true,
      language,
      current: 'HOME',
      enable_game: false,
    };
  }

  onChangeTab = (current) => {
    this.setState({ current });
  }

  onChangeLanguage = (language) => {
    I18n.locale = language;

    this.setState({
      language,
    });
  }

  initialData = async () => {
    const { data: { enable_game, api_server } } = await apiServices.get('/initial');
    AsyncStorage.setItem('gameServer', api_server.game);
    const authorization = await AsyncStorage.getItem('Authorization');
    if (!authorization) {
      const uid = await DeviceInfo.getUniqueId();
      const rand = Math.random().toString(16).substring(2, 15);
      const data = {
        uid: `${uid}-${rand}`,
        email: rand,
      };
      const { data: { access_token } } = await gameServices.post('/register', data);
      console.log('===========register success==========', access_token);
      AsyncStorage.setItem('Authorization', `Bearer ${access_token}`);
    }
    this.setState({ enable_game });
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  componentDidMount() {
    this.initialData();
    RNBootSplash.hide();
    this.checkPermission();
  }

  render() {
    const { hasUpdated, language, current, enable_game } = this.state;
    const { navigation } = this.props;

    const TABS = [
      {
        key: 'HOME',
        title: 'home.title',
        showHeader: false,
        icon: iconHome,
        disabled: false,
        activeIcon: iconHomeActive,
        component: () => <Main onChangeTab={this.onChangeTab} language={language} onChangeLanguage={this.onChangeLanguage} navigation={navigation} />,
      },
      {
        key: 'SCHEDULE',
        title: 'home.schedule',
        showHeader: true,
        icon: iconSchedule,
        disabled: false,
        activeIcon: iconScheduleActive,
        component: () => <Schedule navigation={navigation} />,
      },
      {
        key: 'GAME',
        title: 'home.Game',
        showHeader: true,
        icon: iconGame,
        disabled: !enable_game,
        activeIcon: iconGameActive,
        component: () => <Game navigation={navigation} />,
      },
      {
        key: 'NEWS',
        title: 'home.News',
        showHeader: true,
        icon: iconNews,
        disabled: false,
        activeIcon: iconNewsActive,
        component: () => <News navigation={navigation} />,
      },
      {
        key: 'MORE',
        title: 'home.More',
        showHeader: true,
        icon: iconMore,
        disabled: false,
        activeIcon: iconMoreActive,
        component: () => <More navigation={navigation} />,
      },
    ];

    const matchTab = TABS.find(tab => tab.key === current);

    return (
      hasUpdated
        ? (
          <View style={{ flex: 1 }}>
            <Header />
            <Page title={matchTab.showHeader && matchTab.title}>
              {matchTab.component()}
            </Page>
            <Style.NavBar>
              {
                TABS.map(tab => (
                  <Style.NavItem disabled={tab.disabled} key={tab.key} onPress={() => this.setState({ current: tab.key })}>
                    <Style.NavIcon source={current === tab.key ? tab.activeIcon : tab.icon} />
                    <Style.NavText active={current === tab.key}>
                      {I18n.t(tab.title)}
                    </Style.NavText>
                  </Style.NavItem>
                ))
              }
            </Style.NavBar>
          </View>
        )
        : (<View />)
    );
  }
}

const MyStack = new createStackNavigator({
  Main: { screen: App, navigationOptions: { header: null } },
  ScheduleDetail: { screen: ScheduleDetail },
  MySchedule: { screen: MySchedule },
  UnConf: { screen: UnConf },
  Sponsor: { screen: Sponsor },
  SponsorDetail: { screen: SponsorDetail },
  Speaker: { screen: Speaker },
  SpeakerDetail: { screen: SpeakerDetail },
  Community: { screen: Community },
  CommunityDetail: { screen: CommunityDetail },
  VolunteerDetail: { screen: VolunteerDetail },
  QRCode: { screen: QRCode },
  QA: { screen: QA },
  Reward: { screen: Reward },
  GameDetail: { screen: GameDetail },
  // MissionDetail: { screen: MissionDetail },
}, {
  initialRouteName: 'Main'
});

const AppContainer = createAppContainer(MyStack);

export default class extends Component {
  render() {
    return (
      <Provider>
        <AppContainer />
      </Provider>
    )
  }
}