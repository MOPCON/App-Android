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
    speaker: null
  }

  async componentDidMount() {
    const { speakerId } = this.props.navigation.state.params;
    const speakerText = await AsyncStorage.getItem('speaker');
    const speaker = JSON.parse(speakerText).payload.find(s => s.speaker_id === speakerId);
    console.log('speakerId', speakerId);
    console.log('speaker', speaker);

    this.setState({ speaker });
  }

  render() {
    const { speaker } = this.state;

    const name = speaker && (I18n.locale === 'en' ? speaker.name_en : speaker.name);
    const info = speaker && (I18n.locale === 'en' ? speaker.info_en : speaker.info);
    const job = speaker && (speaker.job);
    const picture = speaker && (speaker.picture);

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SpeakerContainer>
          <Style.ItemContainer>
            <SpeakerItem
              name={name}
              job={job}
              picture={picture}
            />
          </Style.ItemContainer>
          <Style.Intro>
            {info}
          </Style.Intro>
          <SpeechItem />
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}