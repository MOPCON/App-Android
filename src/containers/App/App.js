import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { RSA } from 'react-native-rsa-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'react-native-firebase';
import Header from './Header';
import Main from '../Main/Main';
import Schedule from '../Schedule/Schedule';
import UnConf from '../UnConf/UnConf';
import Sponsor from '../Sponsor/Sponsor';
import ScheduleDetail from '../ScheduleDetail/ScheduleDetail';
import SponsorDetail from '../SponsorDetail/SponsorDetail';
import Speaker from '../Speacker/Speaker';
import SpeakerDetail from '../SpeakerDetail/SpeakerDetail';
import News from '../News/News';
import Community from '../Community/Community';
import CommunityDetail from '../CommunityDetail/CommunityDetail';
import QRCode from '../QRCode/QRCode';
import MySchedule from '../MySchedule/MySchedule';
import QA from '../QA/QA';
import Missiontable from '../MissionTable/Missiontable';
import MissionDetail from '../MissionDetail/MissionDetail';
import * as theme from '../../theme';
import apiServices from '../../api/services';
import '../../utils/extends';
import Provider from '../../store';

class App extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    },
    title: '',
  };

  state = {
    hasUpdated: false,
  }

  updateData = async () => {
    try {
      const [schedule, codeOfConduct, speaker, unconf, sponsor, community, volunteer, carousel, news] = await Promise.all([
        apiServices.get(`/schedule`),
        apiServices.get(`/code-of-conduct`),
        apiServices.get(`/speaker`),
        apiServices.get(`/schedule-unconf`),
        apiServices.get(`/sponsor`),
        apiServices.get(`/community`),
        apiServices.get(`/volunteer`),
        apiServices.get(`/carousel`),
        apiServices.get(`/news`),
      ]);
      await AsyncStorage.setItem('schedule', JSON.stringify(schedule));
      await AsyncStorage.setItem('codeOfConduct', JSON.stringify(codeOfConduct));
      await AsyncStorage.setItem('speaker', JSON.stringify(speaker));
      await AsyncStorage.setItem('unconf', JSON.stringify(unconf));
      await AsyncStorage.setItem('sponsor', JSON.stringify(sponsor));
      await AsyncStorage.setItem('community', JSON.stringify(community));
      await AsyncStorage.setItem('volunteer', JSON.stringify(volunteer));
      // await AsyncStorage.setItem('updateTime', new Date());
      await AsyncStorage.setItem('carousel', JSON.stringify(carousel));
      await AsyncStorage.setItem('news', JSON.stringify(news));
      this.setState({ hasUpdated: true });
      return true;
    } catch (e) {
      console.warn('api 呼叫失敗 過三秒重試')
      setTimeout(this.updateData, 3000);
      return false;
    }
  }

  // TODO add try catch;
  async componentDidMount() {
    try {
      this.updateData();
    } catch (e) { }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { hasUpdated } = this.state;
    return (
      hasUpdated
        ? (
          <View style={{ flex: 1 }}>
            <Header />
            <Main navigate={navigate} />
          </View>
        )
        : (<View />)
    );
  }
}

const AppWithNav = new createStackNavigator({
  Main: { screen: App },
  MySchedule: { screen: MySchedule },
  Schedule: { screen: Schedule },
  UnConf: { screen: UnConf },
  ScheduleDetail: { screen: ScheduleDetail },
  Sponsor: { screen: Sponsor },
  SponsorDetail: { screen: SponsorDetail },
  Speaker: { screen: Speaker },
  SpeakerDetail: { screen: SpeakerDetail },
  News: { screen: News },
  Community: { screen: Community },
  CommunityDetail: { screen: CommunityDetail },
  QRCode: { screen: QRCode },
  QA: { screen: QA },
  Missiontable: { screen: Missiontable },
  MissionDetail: { screen: MissionDetail },
});

export default class extends Component {
  render() {
    return (
      <Provider>
        <AppWithNav />
      </Provider>
    )
  }
}