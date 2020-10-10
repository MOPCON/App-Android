import React, { Component } from 'react';
import { ScrollView, Linking, TouchableOpacity } from 'react-native';
import apiService from '../../api/services';
import * as Style from './style';
import I18n from '../../locales';
import IconFB from '../../images/icon/icon_fb.png';
import IconIG from '../../images/icon/icon_ig.png';
import IconTe from '../../images/icon/icon_tw.png';
import IconTw from '../../images/icon/icon_tw.png';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { useNavigation, useRoute } from "@react-navigation/native";

const CommunityDetail = ({ navigation, route }) => {
  const [ community, setCommunity ] = React.useState({})

  React.useEffect(() => {
    const getDetail = async (url) => {
      const { data: community } = await apiService.get(url);
      setCommunity(community);
    }

    const { url } = route.params;
    getDetail(url);
  }, [])

  const _renderLinkBtn = () => {
    if (!community) return;

    const url = community.event
      || community.facebook
      || community.instagram
      || community.telegram
      || community.twitter;

    if (!url) {
      return null
    }

    return (
      <Style.MoreButton onPress={() => {
        Linking.openURL(url)
      }}>
        <Style.MoreText>{I18n.t('community.more')}</Style.MoreText>
      </Style.MoreButton>
    );
  }

  const info = I18n.locale === 'en' ? community.introduction_e : community.introduction;

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
              <TouchableOpacity onPress={() => {
                Linking.openURL(community.facebook);
              }}>
                <Style.IconImg resizeMode="contain" source={IconFB} />
              </TouchableOpacity>
            )
          }
          {
            Boolean(community.instagram) &&
            (
              <TouchableOpacity onPress={() => {
                Linking.openURL(community.instagram);
              }}>
                <Style.IconImg resizeMode="contain" source={IconIG} />
              </TouchableOpacity>
            )
          }
          {
            Boolean(community.twitter) &&
            (
              <TouchableOpacity onPress={() => {
                Linking.openURL(community.twitter);
              }}>
                <Style.IconImg resizeMode="contain" source={IconTw} />
              </TouchableOpacity>
            )
          }
          {
            Boolean(community.telegram) &&
            (
              <TouchableOpacity onPress={() => {
                Linking.openURL(community.telegram);
              }}>
                <Style.IconImg resizeMode="contain" source={IconTe} />
              </TouchableOpacity>
            )
          }
        </Style.IconPanel>
        <Style.Content>
          {info}
        </Style.Content>
        {_renderLinkBtn()}
      </Style.Container>
    </ScrollView>
  );
}

CommunityDetail.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.community_info', 'mode2')
export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <CommunityDetail {...props} navigation={navigation} route={route} />
}
