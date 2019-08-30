import React, { Component } from 'react';
import { ScrollView, Linking, TouchableOpacity } from 'react-native';
import apiService from '../../api/services';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import IconFB from '../../images/icon/icon_facebook.png';
import IconIG from '../../images/icon/icon_instagram.png';
import IconTe from '../../images/icon/icon_telegram.png';
import IconTw from '../../images/icon/icon_twitter.png';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

export default class CommunityDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.community_info', 'mode2')

  state = {
    community: {},
  }

  getDetail = async (url) => {
    const { data: community } = await apiService.get(url);
    this.setState({ community });
  }

  async componentDidMount() {
    const { url } = this.props.navigation.state.params;
    // const communityText = await AsyncStorage.getItem('community');
    // const community = JSON.parse(communityText).payload.find(c => c.id === id);
    // this.setState({ community });
    this.getDetail(url);
  }

  linkBtn = () => {
    if (!this.state.community) return;

    const url = this.state.community.facebook || this.state.community.other_links;

    if (!url) return;

    return (
      <Style.MoreButton onPress={() => { Linking.openURL(url) }}>
        <Style.MoreText>{I18n.t('community.more')}</Style.MoreText>
      </Style.MoreButton>
    );
  }

  render() {
    const { community } = this.state;
    const info = I18n.locale === 'en' ? community.introduction_en : community.introduction;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.logo
            source={{ uri: community.photo }}
          />
          <Style.Title>
            {community.name}
          </Style.Title>
          <Style.IconPanel>
            {
              Boolean(community.facebook) &&
              (
                <TouchableOpacity onPress={()=>{Linking.openURL(community.facebook);}}>
                  <Style.IconImg resizeMode="contain" source={IconFB} />
                </TouchableOpacity>
              )
            }
            {
              Boolean(community.instagram) &&
              (
                <TouchableOpacity onPress={()=>{Linking.openURL(community.instagram);}}>
                  <Style.IconImg resizeMode="contain" source={IconIG} />
                </TouchableOpacity>
              )
            }
            {
              Boolean(community.twitter) &&
              (
                <TouchableOpacity onPress={()=>{Linking.openURL(community.twitter);}}>
                  <Style.IconImg resizeMode="contain" source={IconTw} />
                </TouchableOpacity>
              )
            }
            {
              Boolean(community.telegram) &&
              (
                <TouchableOpacity onPress={()=>{Linking.openURL(community.telegram);}}>
                  <Style.IconImg resizeMode="contain" source={IconTe} />
                </TouchableOpacity>
              )
            }
          </Style.IconPanel>
          <Style.Content>
            {info}
          </Style.Content>
          {this.linkBtn()}
        </Style.Container>
      </ScrollView>
    );
  }
}