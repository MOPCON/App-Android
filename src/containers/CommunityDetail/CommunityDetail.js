import React, { Component } from 'react';
import { ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import iconFB from '../../images/icon/facebook.png';
import iconShare from '../../images/icon/group.png';

export default class CommunityDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.community_info', 'mode2')

  state = {
    community: {},
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const communityText = await AsyncStorage.getItem('community');
    const community = JSON.parse(communityText).payload.find(c => c.id === id);

    this.setState({ community });
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
    const title = community.title;
    const info = I18n.locale === 'en' ? community.info_en : community.info;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.logo
            source={{ uri: community.logo }}
          />
          <Style.Title>
            { title }
          </Style.Title>
          <Style.Content>
            { info }
          </Style.Content>
          { this.linkBtn() }
        </Style.Container>
      </ScrollView>
    );
  }
}