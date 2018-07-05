import React, { Component } from 'react';
import * as Style from './style';
import Button from '../Button/Button';

import buttonStarNormal from '../../images/icon/buttonStarNormal.png';
import buttonSlide from '../../images/icon/buttonSlide.png';

export default class SpeakerItem extends Component {
  static defaultProps = {
    color: 'normal'  // normal or inverse
  }
  render() {
    const { color } = this.props;

    return (
      <Style.SpeechItemContainer color={color}>
        <Style.Title>MOBILE APP & ENG</Style.Title>
        <Style.Content>如何寫出有效率、好讀、好維護的Java / Android 程式</Style.Content>
        <Style.FuncView>
          <Button text="加入行程" margin={[0, 8, 0, 0]} iconURI={buttonStarNormal} color="inverse" />
          <Button text="投影片" margin={[0, 0, 0, 0]} iconURI={buttonSlide} color="inverse" />
        </Style.FuncView>
      </Style.SpeechItemContainer>
    );
  }
}