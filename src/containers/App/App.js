import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
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
import { updateData } from './ApiServices';
import * as theme from '../../theme';
import '../../utils/extends';

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
    const [schedule, codeOfConduct, speaker, unconf, sponsor, community, volunteer, carousel, news] = await updateData();
    await AsyncStorage.setItem('schedule', schedule);
    await AsyncStorage.setItem('codeOfConduct', codeOfConduct);
    await AsyncStorage.setItem('speaker', speaker);
    await AsyncStorage.setItem('unconf', unconf);
    await AsyncStorage.setItem('sponsor', sponsor);
    await AsyncStorage.setItem('community', community);
    await AsyncStorage.setItem('volunteer', volunteer);
    await AsyncStorage.setItem('updateTime', new Date());
    await AsyncStorage.setItem('carousel', carousel);
    await AsyncStorage.setItem('news', news);
    this.setState({ hasUpdated: true });
    return true;
  }

  // TODO add try catch;
  async componentDidMount() {
    firebase.messaging().getToken().then(fcmToken => console.log(`fcmToken:${fcmToken}`));

    const updateTime = await AsyncStorage.getItem('updateTime');
    const publicKey = await AsyncStorage.getItem('publicKey');
    if (!publicKey) {
      const rsaKey = await RSA.generateKeys(4096);
      AsyncStorage.setItem('publicKey', rsaKey.public);
      AsyncStorage.setItem('privateKey', rsaKey.private);
    }
    // TODO discuss with andy
    // if(updateTime){
    //   this.setState({ hasUpdated: true });
    //   console.log('should not update data');
    // } else {
    //   console.log('update data');
    //   this.updateData();
    // }
    this.updateData();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { hasUpdated } = this.state;
    return (
      hasUpdated ?
        (<View style={{ flex: 1 }}>
          <Header />
          <Main navigate={navigate} />
        </View>) : (<View />)
    );
  }
}

export default StackNavigator({
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
});