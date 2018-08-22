import React, { Component } from 'react';
import I18n from '../../locales';
import { ScrollView, AsyncStorage } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';

export default class Speaker extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode1')

  state = {
    speaker: []
  }

  goDetail = (speakerId) => {
    this.props.navigation.navigate('SpeakerDetail', { speakerId });
  }

  async componentDidMount() {
    const speakerText = await AsyncStorage.getItem('speaker');
    const speaker = JSON.parse(speakerText).payload;
    console.log(speaker);
    this.setState({
      speaker
    });
  }

  renderSpeaker() {
    const { speaker } = this.state;

    return speaker.map((s, index) => {
      const props = {
        name: I18n.locale === 'en' ? s.name_en : s.name,
        job: s.job,
        info: I18n.locale === 'en' ? s.info_en : s.info,
        picture: s.picture,
      };

      return (
        <Style.Card key={`speaker_${index}`} onPress={() => this.goDetail(s.speaker_id)}>
          <SpeakerItem {...props} />
        </Style.Card>
      );
    })
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SpeakerContainer>
          { this.renderSpeaker() }
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}