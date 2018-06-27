import React, { Component } from 'react';
import * as Style from './style';

import { Text } from 'react-native';

export default class SpeakerItem extends Component {
  render() {
    return (
      <Style.SpeakerItemContainer>
        <Style.ImageContainer>
          <Style.Image></Style.Image>
        </Style.ImageContainer>
        <Style.ContentContainer>
          <Style.Title>田哲宇</Style.Title>
          <Style.Info>台灣區經理</Style.Info>
          <Style.Info>Google Cloud</Style.Info>
        </Style.ContentContainer>
      </Style.SpeakerItemContainer>
    );
  }
}