import React, { Component } from 'react';
import { ScrollView, AsyncStorage } from 'react-native';
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
    const { title } = this.props.navigation.state.params;
    const communityText = await AsyncStorage.getItem('community');
    const community = JSON.parse(communityText).payload.find(c => c.title === title);

    this.setState({ community });
  }
  
  render() {
    const { community } = this.state;
    const title = community && (community.title);
    const info = community && (I18n.locale === 'en' ? community.name_en : community.name);

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.Card />
          <Style.Title>
            { title }
          </Style.Title>
          <Style.Content>
            { info }
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
      </ScrollView>
    );
  }
}