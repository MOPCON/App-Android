import React, { Component } from 'react';
import I18n from '../../locales';
import { ScrollView } from 'react-native';
import apiServices from '../../api/services';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';

export default class Speaker extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.list', 'mode2')

  state = {
    speaker: []
  }

  goDetail = (speakerId) => {
    this.props.navigation.navigate('SpeakerDetail', { speakerId });
  }

  getSpeakers = async() => {
    const { data: speaker } = await apiServices.get('/speaker');
    this.setState({speaker});
  }

  componentDidMount() {
    // const speakerText = await AsyncStorage.getItem('speaker');
    // const spObject = JSON.parse(speakerText).payload;
    // const speaker = Object.keys(spObject).map(key => spObject[key]);
    // this.setState({
    //   speaker
    // });
    this.getSpeakers();
  }

  renderSpeaker() {
    const { speaker } = this.state;

    return speaker.map((s, index) => {
      const props = {
        name: I18n.locale === 'en' ? s.name_e : s.name,
        job: I18n.locale === 'en' ? s.job_title_e : s.job_title,
        company: I18n.locale === 'en' ? s.company_e : s.company,
        picture: s.img.mobile,
        tags: s.tags,
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
          {this.renderSpeaker()}
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}