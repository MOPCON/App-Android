import React, { Component } from 'react';
import { ScrollView } from 'react-native';

import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import iconUnconference from '../../images/icon/iconUnconference.png';
import iconSpeakers from '../../images/icon/iconSpeakers.png';
import iconSponsor from '../../images/icon/iconSponsor.png';
import iconCommunity from '../../images/icon/iconCommunity.png';
import iconChevronRightImg from '../../images/icon/iconChevronRight.png';

import * as Style from './style';

const MENUS = [
  {
    title: 'home.Unconference',
    icon: iconUnconference,
    screen: 'UnConf',
  },
  {
    title: 'home.Speakers',
    icon: iconSpeakers,
    screen: 'Speaker',
  },
  {
    title: 'home.Sponsors',
    icon: iconSponsor,
    screen: 'Sponsor',
  },
  {
    title: 'home.Community',
    icon: iconCommunity,
    screen: 'Community',
  },
];

export default class More extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'more.title', 'mode1')

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.MoreContainer>
          {
            MENUS.map(menu => (
              <Style.MenuItem onPress={() => navigation.navigate(menu.screen)}>
                <Style.MenuTitle>
                  <Style.MenuIcon source={menu.icon} />
                  <Style.MenuText>{I18n.t(menu.title)}</Style.MenuText>
                </Style.MenuTitle>
                <Style.RightArrow source={iconChevronRightImg} />
              </Style.MenuItem>
            ))
          }
        </Style.MoreContainer>
      </ScrollView>
    );
  }
}