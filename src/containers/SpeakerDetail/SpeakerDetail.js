import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import ScheduleView from '../../components/ScheduleItem/ScheduleView';
// import SpeechItem from '../../components/SpeechItem/SpeechItem';
import * as Style from './style';

export default class SpeakerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode2')

  state = {
    speaker: {},
    savedSchedule: {},
    isReadMore: false,
  }

  async componentDidMount() {
    const { speakerId } = this.props.navigation.state.params;
    const speakerText = await AsyncStorage.getItem('speaker');
    const spObject = JSON.parse(speakerText).payload;
    const speakerList = Object.keys(spObject).map(key => spObject[key]);
    const speaker = speakerList.find(s => s.speaker_id === speakerId);
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }

    this.setState({ speaker, savedSchedule });
  }

  onPressTitle = (agenda) => () => {
    this.props.navigation.navigate('ScheduleDetail', { agenda });
  }

  onSave = () => {
    const { schedule_id } = this.state.speaker;
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[schedule_id] = !savedSchedule[schedule_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  render() {
    const { speaker, savedSchedule, isReadMore } = this.state;

    const name = I18n.locale === 'en' ? speaker.name_en : speaker.name;
    const info = I18n.locale === 'en' ? speaker.info_en : speaker.info;
    const job = speaker.job;
    const company = speaker.company;
    const picture = speaker.picture;
    const category = speaker.category;
    const topic = I18n.locale === 'en' ? speaker.schedule_topic_en : speaker.schedule_topic;

    const introProps = isReadMore ? {} : { numberOfLines: 3 };

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SpeakerContainer>
          <Style.ItemContainer>
            <Style.SpeakerPicture source={{ uri: picture }} />
            <Style.SpeakerText>{name}</Style.SpeakerText>
            <Style.TitleText>{job} @ {company}</Style.TitleText>
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
          {
            // <SpeechItem
            //   category={category}
            //   topic={topic}
            //   saved={savedSchedule[speaker.schedule_id]}
            //   slide={speaker.slide}
            //   onSave={this.onSave}
            // />
          }

          <ScheduleView key={`speaker_${speaker.schedule_id || topic}`}>
            <ScheduleHeader
              // time={agenda.duration}
              onSave={this.onSave}
              saved={savedSchedule[speaker.schedule_id]}
            />
            <ScheduleItem
              regular
              title={topic}
              category={category}
              onPressTitle={speaker.schedule_id ? this.onPressTitle(speaker) : () => { }}
              name={name}
              // room={agenda.location}
            />
          </ScheduleView>
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}