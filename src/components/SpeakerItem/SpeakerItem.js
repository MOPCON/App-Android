import React, { Component } from 'react';
import I18n from '../../locales';
import * as Style from './style';

import { View } from 'react-native';

export default class SpeakerItem extends Component {
  render() {
    const { speaker } = this.props;

    const name = speaker && (I18n.locale === 'en' ? speaker.name_en : speaker.name);
    const job = speaker && (speaker.job);
    const picture = speaker && (speaker.picture);

    return (
      <Style.SpeakerItemContainer>
        <Style.ImageContainer>
          <Style.Image source={{ uri: picture }}></Style.Image>
        </Style.ImageContainer>
        <Style.ContentContainer>
          <Style.Title>{name}</Style.Title>
          <View style={{flexDirection:'row'}}>
            <Style.Info>{job}</Style.Info>
          </View>
          <View style={{flexDirection:'row'}}>
            <Style.Info>Google Cloud</Style.Info>
          </View>
        </Style.ContentContainer>
      </Style.SpeakerItemContainer>
    );
  }
}