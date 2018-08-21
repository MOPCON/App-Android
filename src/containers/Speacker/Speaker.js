import React, { Component } from 'react';
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

  render() {
    const { speaker } = this.state;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SpeakerContainer>
          {
            speaker.map((s, index) => (
              <Style.Card key={`speaker_${index}`} onPress={() => this.goDetail(s.speaker_id)}>
                <SpeakerItem speaker={s}/>
              </Style.Card>
            ))
          }
        </Style.SpeakerContainer>
      </ScrollView>
    );
  }
}