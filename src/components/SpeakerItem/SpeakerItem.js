import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

import { View } from 'react-native';

export default class SpeakerItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    job: PropTypes.string,
    company: PropTypes.string,
    picture: PropTypes.string,
  }
  static defaultProps = {
    name: '',
    job: '',
    company: '',
    picture: '',
  }
  render() {
    const { name, job, company, picture } = this.props;

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
            <Style.Info>{company}</Style.Info>
          </View>
        </Style.ContentContainer>
      </Style.SpeakerItemContainer>
    );
  }
}
