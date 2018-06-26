import React, { Component } from 'react';
import * as Style from './style';
import Button from './Button';

import buttonStarNormal from '../../images/icon/buttonStarNormal.png';
import buttonSlide from '../../images/icon/buttonSlide.png';

export default class SpeakerItem extends Component {
  render() {
    return (
      <Style.SpeechItemContainer>
        <Style.Title>MOBILE APP & ENG</Style.Title>
        <Style.Content>如何寫出有效率、好讀、好維護的Java / Android 程式</Style.Content>
        <Style.FuncView>
          <Button text="加入行程" icon={buttonStarNormal}/>
          <Button text="SLIDE" icon={buttonSlide}/>
        </Style.FuncView>
      </Style.SpeechItemContainer>
    );
  }
}