import React, { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';
import SpeechItem from '../../components/SpeechItem/SpeechItem';
import * as Style from './style';

export default class SpeakerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode2')

  state = {
    speaker: {},
    savedSchedule: {},
  }

  async componentDidMount() {
    const { speakerId } = this.props.navigation.state.params;
    const speakerText = await AsyncStorage.getItem('speaker');
    const speaker = JSON.parse(speakerText).payload.find(s => s.speaker_id === speakerId);
    console.log('speakerId', speakerId);
    console.log('speaker', speaker);
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }

    this.setState({ speaker, savedSchedule });
  }

  onSave = () => {
    debugger;
    const { schedule_id } = this.state.speaker;
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[schedule_id] = !savedSchedule[schedule_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  render() {
    const { speaker, savedSchedule } = this.state;

    const name = I18n.locale === 'en' ? speaker.name_en : speaker.name;
    const info = I18n.locale === 'en' ? speaker.info_en : speaker.info;
    const job = speaker.job;
    const company = speaker.company;
    const picture = speaker.picture;
    const type = speaker.type;
    const topic = I18n.locale === 'en' ? speaker.schedule_topic_en : speaker.schedule_topic;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SpeakerContainer>
          <Style.ItemContainer>
            <SpeakerItem
              name={name}
              job={job}
              picture={picture}
              company={company}
            />
          </Style.ItemContainer>
          <Style.Intro>
            {info}
          </Style.Intro>
          <SpeechItem
            type={type}
            topic={topic}
            saved={savedSchedule[speaker.schedule_id]}
            slide={speaker.slide}
            onSave={this.onSave}
          />
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}