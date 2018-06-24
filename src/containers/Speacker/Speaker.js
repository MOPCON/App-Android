import React, { Component } from 'react';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';

export default class Speaker extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode1')

  render() {
    return (
      <Style.SpeakerScrollView>
        <Style.SpeakerContainer>
          <Style.Card>
            <SpeakerItem />
          </Style.Card>
          <Style.Card>
            <SpeakerItem />
          </Style.Card>
          <Style.Card>
            <SpeakerItem />
          </Style.Card>
          <Style.Card>
            <SpeakerItem />
          </Style.Card>
        </Style.SpeakerContainer>
      </Style.SpeakerScrollView>
    );
  }
}