import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { AVATAR } from '../Community/VolunteerBlock';
import apiServices from '../../api/services';

export default class VolunteerDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.volunteer_info', 'mode2')

  state = {
    volunteer: { members: [] },
  }

  getVolunteerDetail = async (url) => {
    const { data: volunteer } = await apiServices.get(url);
    this.setState({ volunteer })
  }

  componentDidMount() {
    const { url, id } = this.props.navigation.state.params;
    // const volunteerText = await AsyncStorage.getItem('volunteer');
    // const volunteer = JSON.parse(volunteerText).payload.find(c => c.id === id);

    // this.setState({ volunteer });
    this.getVolunteerDetail(url);
  }

  render() {
    const { volunteer } = this.state;
    const { id } = this.props.navigation.state.params;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.logo
            source={AVATAR[id]}
          />
          <Style.Title>
            {volunteer.name}
          </Style.Title>
          <Style.Content>
            {volunteer.introduction}
          </Style.Content>
          <View style={{ flex: 1 }}>
            <Style.MemberText>{I18n.t('community.member')}</Style.MemberText>
            <Style.MemberText>
              {volunteer.members.map(m => m.trim()).join(' ， ')}
            </Style.MemberText>
          </View>
        </Style.Container>
      </ScrollView>
    );
  }
}