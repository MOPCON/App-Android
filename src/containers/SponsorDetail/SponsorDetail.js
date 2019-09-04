import React from 'react'
import moment from 'dayjs';
import { ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import I18n from '../../locales';
import * as Style from './style';

const toTime = timestamp => moment(timestamp).format('HH:mm')

const normalizeScheduleData = (originScheduleData, savedSchedule) => ({
  ...originScheduleData,
  time: `${toTime(originScheduleData.started_at * 1000)} - ${toTime(originScheduleData.endeded_at * 1000)}`,
  saved: Boolean(savedSchedule[originScheduleData.session_id]),
  speaker: originScheduleData.name,
  speaker_e: originScheduleData.name_e,
  title: originScheduleData.topic_name,
  title_e: originScheduleData.topic_name_e,
});

export default class SponsorDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.info', 'mode2')

  state = {
    sponsor: {},
    savedSchedule: {},
  }

  async componentDidMount() {
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }
    this.setState({ savedSchedule });
  }

  openLink = (url) => {
    Linking.openURL(url);
  }

  onPressTitle = ({ session_id }) => {
    const savedStatus = this.state.savedSchedule[session_id];
    this.props.navigation.navigate('ScheduleDetail', { session_id, savedStatus, onSave: this.onSave });
  }

  onSave = ({ session_id }) => {
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[session_id] = !savedSchedule[session_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  render() {
    const { sponsorDetail } = this.props.navigation.state.params;
    const name = I18n.locale === 'en' ? sponsorDetail.name_e : sponsorDetail.name;
    const info = I18n.locale === 'en' ? sponsorDetail.about_us_e : sponsorDetail.about_us;
    const logo = sponsorDetail.logo_path;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.CardView>
            <Style.CardImg
              source={{ uri: logo }}
            />
          </Style.CardView>
          <Style.SponsorName>
            {name}
          </Style.SponsorName>
          <Style.SplitText>關於廠商</Style.SplitText>
          <Style.SponsorDesc>
            {info}
          </Style.SponsorDesc>
          <Style.SplitText>贊助場次</Style.SplitText>

          {
            sponsorDetail.speaker_information
              .map((d) => (normalizeScheduleData(d, this.state.savedSchedule)))
              .map(scheduleData => (
                <ScheduleCard key={scheduleData.title_e} scheduleData={scheduleData} onPressTitle={this.onPressTitle} onSave={this.onSave} />
              ))
          }

          <Style.MoreButton onPress={() => this.openLink(sponsorDetail.understand_more)}>
            <Style.MoreText>{I18n.t('sponsor.more')}</Style.MoreText>
          </Style.MoreButton>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}