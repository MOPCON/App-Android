import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

import iconFB from '../../images/icon/facebook.png';
import iconShare from '../../images/icon/group.png';

export default class CommunityDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'home.Community', 'mode2')

  render() {
    return (
      <Style.Container>
        <Style.Card/>
        <Style.Title>KSDG</Style.Title>
        <Style.Content>
          Kaohsiung Software Developer Group 是高雄從事軟體開發、網路技術開發者一起交流的園地，2012/05首度聚會活動。
          目前每月舉辦 Meet-up 及 Web Course 各一場，交流主題涵蓋各種軟體技術，歡迎對軟體開發技術有興趣的朋友可以踴躍參與。
        </Style.Content>
        <Style.BtnContainer>
          <Style.Btn>
            <Style.BtnImage source={iconFB} />
          </Style.Btn>
          <Style.Btn>
            <Style.BtnImage source={iconShare} />
          </Style.Btn>
        </Style.BtnContainer>
      </Style.Container>
    );
  }
}