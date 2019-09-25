import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Linking } from 'react-native';
import moment from 'dayjs';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import gameServices from '../../api/gameServices';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
// import SpeechItem from '../../components/SpeechItem/SpeechItem';
import iconFB from '../../images/icon/iconFB.png';
import iconGithub from '../../images/icon/iconGithub.png';
import iconIG from '../../images/icon/iconIG.png';
import * as Style from './style';

const toTime = timestamp => moment(timestamp).format('HH:mm');
export default class SpeakerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode2')

  state = {
    speaker: {},
    savedSchedule: {},
    isReadMore: false,
  }

  async componentDidMount() {
    // const { speakerId } = this.props.navigation.state.params;
    // const speakerText = await AsyncStorage.getItem('speaker');
    // const spObject = JSON.parse(speakerText).payload;
    // const speakerList = Object.keys(spObject).map(key => spObject[key]);
    // const speaker = speakerList.find(s => s.speaker_id === speakerId);
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }
    this.setState({savedSchedule});
    // this.setState({ speaker, savedSchedule });
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
    gameServices.post('/mySession', {session_id, action: savedSchedule[session_id] ? 'add' : 'remove'});
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  render() {
    const { savedSchedule, isReadMore } = this.state;
    const { speakerDetail } = this.props.navigation.state.params;

    const name = I18n.locale === 'en' ? speakerDetail.name_e : speakerDetail.name;
    const info = I18n.locale === 'en' ? speakerDetail.bio_e : speakerDetail.bio;
    const job = I18n.locale === 'en' ? speakerDetail.job_title_e : speakerDetail.job_title;
    const company = I18n.locale === 'en' ? speakerDetail.company_e : speakerDetail.company;
    const picture = speakerDetail.img.mobile;
    
    const scheduleData = {
      time: `${toTime(speakerDetail.started_at * 1000)} - ${toTime(speakerDetail.ended_at * 1000)}`,
      saved: Boolean(savedSchedule[speakerDetail.session_id]),
      title: speakerDetail.topic,
      title_e: speakerDetail.topic_e,
      speaker: speakerDetail.name,
      speaker_e: speakerDetail.name_e,
      room: speakerDetail.room,
      tags: speakerDetail.tags,
    };

    const introProps = isReadMore ? {} : { numberOfLines: 3 };

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SpeakerContainer>
          <Style.ItemContainer>
            <Style.SpeakerPicture source={{ uri: picture }} />
            <Style.SpeakerText>{name}</Style.SpeakerText>
            <Style.TitleText>{job} @ {company}</Style.TitleText>
            <Style.IconContainer>
              {
                Boolean(speakerDetail.link_fb) && (
                  <TouchableOpacity onPress={()=>{Linking.openURL(speakerDetail.link_fb)}}>
                    <Style.Icon source={iconFB} />
                  </TouchableOpacity>
                )
              }
              {
                Boolean(speakerDetail.link_github) && (
                  <TouchableOpacity onPress={()=>{Linking.openURL(speakerDetail.link_github)}}>
                    <Style.Icon source={iconGithub} />
                  </TouchableOpacity>
                )
              }
              {
                Boolean(speakerDetail.link_instagram) && (
                  <TouchableOpacity onPress={()=>{Linking.openURL(speakerDetail.link_instagram)}}>
                    <Style.Icon source={iconIG} />
                  </TouchableOpacity>
                )
              }
            </Style.IconContainer>
          </Style.ItemContainer>

          <Style.Header>
            <Style.SpeakerText>{I18n.t('speaker.about')}</Style.SpeakerText>
            <Style.ReadMoreView onPress={() => this.setState({ isReadMore: !this.state.isReadMore })}>
              <Style.ReadMoreText>{I18n.t('speaker.more')}</Style.ReadMoreText>
            </Style.ReadMoreView>
          </Style.Header>
          <Style.Intro {...introProps}>
            {info}
          </Style.Intro>
          <ScheduleCard scheduleData={scheduleData} onPressTitle={this.onPressTitle} onSave={this.onSave} />
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}