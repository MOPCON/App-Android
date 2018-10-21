import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { RSA } from 'react-native-rsa-native';
import { AsyncStorage } from 'react-native';
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
    await AsyncStorage.setItem('updateTime', new Date());
    await AsyncStorage.setItem('carousel', JSON.stringify(carousel));
    await AsyncStorage.setItem('news', JSON.stringify(news));
    this.setState({ hasUpdated: true });
    return true;
  }

  // TODO add try catch;
  async componentDidMount() {
    // const fcmToken = await firebase.messaging().getToken();
    // const updateTime = await AsyncStorage.getItem('updateTime');
    // const public_key = await AsyncStorage.getItem('public_key');
    // if (!public_key) {
    //   try {
    //     const UUID = Array.from(Array(36)).map(d => Math.floor(Math.random() * 36).toString(36)).join('');
    //     const rsaKey = await RSA.generateKeys(4096);
    //     const result = await apiServices.post('/new-user', { public_key: rsaKey.public, UUID, fcm_push_token: fcmToken });

    //     await AsyncStorage.setItem('UUID', UUID);
    //     await AsyncStorage.setItem('public_key', rsaKey.public);
    //     await AsyncStorage.setItem('private_key', rsaKey.private);
    //   } catch (e) {
    //     console.error('generate key error', e);
    //   }

    // }
    try {
      this.updateData();
    } catch (e) {
      console.log('updateData error', e);
    }
    // TODO discuss with andy
    // if(updateTime){
    //   this.setState({ hasUpdated: true });
    //   console.log('should not update data');
    // } else {
    //   console.log('update data');
    //   this.updateData();
    // }
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