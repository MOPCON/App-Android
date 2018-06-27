import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';
import SpeechItem from '../../components/SpeechItem/SpeechItem';
import * as Style from './style';

export default class SpeakerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode2')

  render() {
    return (
      <Style.SpeakerScrollView>
        <Style.ItemContainer>
          <SpeakerItem />
        </Style.ItemContainer>
        <Style.Intro>
          高雄人，現任 Facebook 軟體工程師，擁有四年 Android 開發經驗，開發過 Facebook 我的收藏、地圖、定位以及 Instgram Direct 訊息功能。熱衷於研究如何寫出有效率、可讀及可維護的程式架構。
        </Style.Intro>
        <SpeechItem />
      </Style.SpeakerScrollView>
    );
  }
}