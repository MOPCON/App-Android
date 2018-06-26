import React, { Component } from 'react';
import * as Style from './style';

export default class Button extends Component {
  render() {
    const { text, icon } = this.props;

    return (
      <Style.Mod>
        <Style.ModIcon source={icon} />
        <Style.ModText>{text}</Style.ModText>
      </Style.Mod>
    );
  }
}