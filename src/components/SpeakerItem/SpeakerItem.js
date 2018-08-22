import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

import { Text } from 'react-native';

export default class SpeakerItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    job: PropTypes.string,
    info: PropTypes.string,
    picture: PropTypes.string,
  }
  static defaultProps = {
    name: '',
    job: '',
    info: '',
    picture: '',
  }
  render() {
    const { name, job, info } = this.props;
    return (
      <Style.SpeakerItemContainer>
        <Style.ImageContainer>
          <Style.Image></Style.Image>
        </Style.ImageContainer>
        <Style.ContentContainer>
          <Style.Title>{name}</Style.Title>
          <Style.Info>{job}</Style.Info>
          <Style.Info>{info}</Style.Info>
        </Style.ContentContainer>
      </Style.SpeakerItemContainer>
    );
  }
}