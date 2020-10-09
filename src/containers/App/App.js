import React, { Component } from 'react';
import { View, Platform, NativeModules, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createCompatNavigatorFactory, createSwitchNavigator } from '@react-navigation/compat';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import DeviceInfo from 'react-native-device-info';
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from '@react-native-community/async-storage';
import { URL, URLSearchParams } from 'whatwg-url';
import { Buffer } from 'buffer';
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
import Game from '../Game/GameV2';
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

global.Buffer = Buffer;
global.URL = URL;
global.URLSearchParams = URLSearchParams;

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
      appState: AppState.currentState,
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
    // set global value
    global.gameServer = api_server.game;
    global.enable_game = enable_game;
    // regist game
    this.setState({ enable_game });
    analytics().logEvent('android_initial_app');
  }

  registerByRandom = async () => {
    const authori = await AsyncStorage.getItem('Authorization');
    if (authori) {
      return true;
    }
    const uid = await DeviceInfo.getUniqueId();
    const rand = Math.random().toString(16).substring(2, 15);
    const data = {
      uid: `${uid}-${rand}`,
      email: rand,
    };
    const { data: { access_token } } = await gameServices.post('/register', data);
    console.log('===========register by random success==========', access_token);
    AsyncStorage.setItem('Authorization', `Bearer ${access_token}`);
    analytics().logEvent('android_register_by_random', data);
  }

  getToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestNotificationPermission() {
    try {
      await messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async checkNotificationPermission() {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestNotificationPermission();
    }
  }

  onLink = async (url) => {
    console.log('onlink', url);
    if (url) {
      const searchString = url.substring(url.indexOf('?') + 1);
      console.log(searchString);
      const param = new URLSearchParams(searchString);
      console.log(param);
      const sn = param.get('sn');
      console.log(sn)
      const uid = await DeviceInfo.getUniqueId();
      const data = {
        uid,
        email: sn,
      };
      const { data: { access_token } } = await gameServices.post('/invite', data);
      console.log('===========register success==========', access_token);
      AsyncStorage.setItem('Authorization', `Bearer ${access_token}`);
      AsyncStorage.setItem('hasInvited', JSON.stringify(data));
      analytics().logEvent('android_register_by_link', data);
      if (this.register) {
        this.register();
      }
      return true;
    }
    return false;
  }

  listenDynamicLink = () => {
    analytics().logEvent('android_listen_invite');
    this.register = dynamicLinks().onLink(this.onLink);
  }

  async componentDidMount() {
    RNBootSplash.hide();
    this.checkNotificationPermission();
    // 取得遊戲 server url 跟遊戲啟用狀態
    await this.initialData();
    const hasInvited = await AsyncStorage.getItem('hasInvited');
    if (!hasInvited) {
      const getInviteResult = await dynamicLinks().getInitialLink().then(this.onLink);
      if (!getInviteResult) {
        this.registerByRandom();
        this.listenDynamicLink();
      }
    }
  }

  componentWillUnmount() {
    if (this.register) {
      this.register();
    }
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
        component: () => <Main onChangeTab={this.onChangeTab} language={language}
                               onChangeLanguage={this.onChangeLanguage} navigation={navigation} />,
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
                  <Style.NavItem disabled={tab.disabled} key={tab.key}
                                 onPress={() => this.setState({ current: tab.key })}>
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

/* Navigation Initial (4.x) */
const routesV4 = [ {
  Main: { screen: App, navigationOptions: { headerShown: false } },
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
} ];


/* Navigation Initial (5.x) */
const routesV5 = [
  { name: 'Main', component: App, screenOptions: { headerShown: false } },
  { name: 'ScheduleDetail', component: ScheduleDetail },
  { name: 'MySchedule', component: MySchedule },
  { name: 'UnConf', component: UnConf },
  { name: 'Sponsor', component: Sponsor },
  { name: 'SponsorDetail', component: SponsorDetail },
  { name: 'Speaker', component: Speaker },
  { name: 'SpeakerDetail', component: SpeakerDetail },
  { name: 'Community', component: Community },
  { name: 'CommunityDetail', component: CommunityDetail },
  { name: 'VolunteerDetail', component: VolunteerDetail },
  { name: 'QRCode', component: QRCode },
  { name: 'QA', component: QA },
  { name: 'Reward', component: Reward },
  { name: 'GameDetail', component: GameDetail },
  // { name: 'MissionDetail', component: MissionDetail },
]

class AppContainer extends Component {
  constructor(p) {
    super(p);
  }

  _renderV4 = () => {
    const RootStack = createCompatNavigatorFactory(createStackNavigator)(...routesV4)
    return <RootStack />
  }

  _renderV5 = () => {
    const Stack = createStackNavigator()
    const mapToScreens = (_routes) => {
      return _routes.map(r => <Stack.Screen {...r} options={r.component.navigationOptions} key={r.name} />)
    }

    return (
      <Stack.Navigator initialRouteName="Main">
        {mapToScreens(routesV5)}
      </Stack.Navigator>
    )
  }

  render() {
    const isLegacy = true;
    return <NavigationContainer>
      {isLegacy ? this._renderV4() : this._renderV5()}
    </NavigationContainer>;
  }
}


export default class extends Component {
  render() {
    return (
      <Provider>
        <AppContainer />
      </Provider>
    )
  }
}
