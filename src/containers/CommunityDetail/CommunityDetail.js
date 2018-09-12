import React, { Component } from 'react';
import { ScrollView, AsyncStorage, Linking } from 'react-native';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import iconFB from '../../images/icon/facebook.png';
import iconShare from '../../images/icon/group.png';

export default class CommunityDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'home.Community', 'mode2')

  state = {
    community: null,
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const communityText = await AsyncStorage.getItem('community');
    const community = JSON.parse(communityText).payload.find(c => c.id === id);

    this.setState({ community });
  }

  linkBtn = (key) => {
    if (!this.state.community) return;
    if (!this.state.community[key]) return;

    let icon = '';
    switch(key) {
      case 'facebook':
        icon = iconFB;
        break;
      case 'other_links':
        icon = iconShare;
        break;
    }
    return (
      <Style.Btn onPress={() => { Linking.openURL(this.state.community[key]) }}>
        <Style.BtnImage source={icon}/>
      </Style.Btn>
    );
  }
  
  render() {
    const { community } = this.state;
    const title = this.state.getNestedValue(['community', 'title']);
    const info = I18n.locale === 'en' ? this.state.getNestedValue(['community', 'info_en']) : this.state.getNestedValue(['community', 'info']);

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.Title>
            { title }
          </Style.Title>
          <Style.Content>
            { info }
          </Style.Content>
          <Style.BtnContainer>
            { this.linkBtn('facebook') }
            { this.linkBtn('other_links') }
          </Style.BtnContainer>
        </Style.Container>
      </ScrollView>
    );
  }
}