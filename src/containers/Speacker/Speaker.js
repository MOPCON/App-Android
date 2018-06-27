import React, { Component } from 'react';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';

export default class Speaker extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode1')

  goDetail = () => {
    this.props.navigation.navigate('SpeakerDetail');
  }

  render() {
    return (
      <Style.SpeakerScrollView>
        <Style.SpeakerContainer>
          <Style.Card onPress={this.goDetail}>
            <SpeakerItem />
          </Style.Card>
          <Style.Card onPress={this.goDetail}>
            <SpeakerItem />
          </Style.Card>
          <Style.Card onPress={this.goDetail}>
            <SpeakerItem />
          </Style.Card>
          <Style.Card onPress={this.goDetail}>
            <SpeakerItem />
          </Style.Card>
        </Style.SpeakerContainer>
      </Style.SpeakerScrollView>
    );
  }
}