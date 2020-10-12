import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { AVATAR } from '../Community/VolunteerBlock';
import apiServices from '../../api/services';
import { useNavigation, useRoute } from "@react-navigation/native";

const VolunteerDetail = ({ navigation, route }) => {

  const [ volunteer, setVolunteer ] = React.useState({ members: [] })
  const [ id, setId ] = React.useState()

  const fetchVolunteerDetail = async (url) => {
    const { data: volunteer } = await apiServices.get(url);
    setVolunteer(volunteer)

    React.useLayoutEffect(() => {
      navigation.setOptions(NavigationOptions(navigation, 'community.volunteer_info', 'mode2'));
    }, [navigation]);
  }

  React.useEffect(() => {
    const { url, id } = route.params;
    setId(id);
    fetchVolunteerDetail(url);
  })

  const lang = I18n.locale;
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Style.Container>
        <Style.logo
          source={AVATAR[id]}
        />
        <Style.Title>
          {lang === 'zh' ? volunteer.name : volunteer.name_e}
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

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute()
  return <VolunteerDetail {...props} navigation={navigation} route={route} />
}

