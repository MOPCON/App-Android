import React from 'react';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

import SpeechItem from '../../components/SpeechItem/SpeechItem';


export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'scheduleDetail.title', 'mode2')
  render() {
    return (
      <Style.SDScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.HeaderImage source={{ uri: 'https://picsum.photos/700/1000/?image=1063' }} />
          <Style.IntroContainer>
            <Style.SpeechItemContainer>
              <SpeechItem color="inverse" />
            </Style.SpeechItemContainer>
            <Style.DesText>
              在軟體公司最痛苦的一件事就是看到前人留下來的程式碼像本天書，看也看不懂、改也改不動，跑起來卻健步如飛，不僅一切正常，勝制連重構後的城市都飽得不如就城市順暢。這個 Session 就是要討論有哪些技巧及新法可以避免寫出這樣難讀、難懂也難維護的程式。
            </Style.DesText>
          </Style.IntroContainer>
        </Style.SDContainer>
      </Style.SDScrollView>
    );
  }
}