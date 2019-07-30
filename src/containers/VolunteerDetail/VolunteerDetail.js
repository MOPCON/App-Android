import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { AVATAR } from '../Community/VolunteerBlock';

export default class VolunteerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.volunteer_info', 'mode2')

  state = {
    volunteer: {},
  }

  async componentDidMount() {
    const { id } = this.props.navigation.state.params;
    const volunteerText = await AsyncStorage.getItem('volunteer');
    const volunteer = JSON.parse(volunteerText).payload.find(c => c.id === id);

    this.setState({ volunteer });
  }
  
  render() {
    const { volunteer } = this.state;
    const groupname = I18n.locale === 'en' ? volunteer.groupname_en : volunteer.groupname;
    const info = I18n.locale === 'en' ? volunteer.info_en : volunteer.info;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.logo
            source={AVATAR[volunteer.id]}
          />
          <Style.Title>
            { groupname }
          </Style.Title>
          <Style.Content>
            { info }
          </Style.Content>
          <View style={{ flex: 1 }}>
            <Style.MemberText>{I18n.t('community.member')}</Style.MemberText>
            <Style.MemberText>
              {(volunteer.memberlist || '').split(',').map(m => m.trim()).join(' ， ')}
            </Style.MemberText>
          </View>
        </Style.Container>
      </ScrollView>
    );
  }
}