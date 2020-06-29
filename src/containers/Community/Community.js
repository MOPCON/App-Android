import React, { Component } from 'react';
import { Linking } from 'react-native';
import VersionNum from 'react-native-version-number';
import apiServices from '../../api/services'
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import TabDate from '../../components/TabDate/TabDate';
import CommunityBlock from './CommunityBlock';
import VolunteerBlock from './VolunteerBlock';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

import iconJoin from '../../images/icon/iconJoin.png';
import iconFollowFB from '../../images/icon/iconFollowFB.png';
import { useNavigation } from "@react-navigation/native";

const Community = ({ navigation }) => {
  const [ tab, setTab ] = React.useState('community')
  const [ state, setState ] = React.useState({
    community: [], // 主辦社群
    participant: [], // 協辦社群
    volunteer: [], // 志工
  })

  const getData = async () => {
    const [
      { data: { community, participant } },
      { data: { volunteer } }
    ] = await Promise.all([
      apiServices.get('/community'),
      apiServices.get('/volunteer')
    ]);
    setState({ ...state, community, volunteer, participant });
  }

  React.useEffect(() => {
    getData();
  }, [])

  const goCommunityDetail = (id) => {
    navigation.navigate('CommunityDetail', { url: `/community/organizer/${id}` });
  }

  const goParticipentDetail = (id) => {
    navigation.navigate('CommunityDetail', { url: `/community/participant/${id}` });
  }

  const goVolunteerDetail = (id) => {
    navigation.navigate('VolunteerDetail', { url: `/volunteer/${id}`, id });
  }

  const goFB = (url) => {
    Linking.openURL('https://www.facebook.com/mopcon');
  }

  const { community, volunteer, participant } = state;

  const tabs = [
    { name: I18n.t('community.tab_community'), value: 'community' },
    { name: I18n.t('community.tab_volunteer'), value: 'volunteer' }
  ];

  return (
    <Style.ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {
        Boolean(community.length)
          ? (
            <React.Fragment>
              <Style.Container>
                <Style.TabContainer>
                  <TabDate tabs={tabs} defaultActiveTab={tab} onChange={setTab(tab)} />
                </Style.TabContainer>
                {
                  tab === 'community'
                    ? <CommunityBlock
                      goCommunityDetail={goCommunityDetail}
                      goParticipentDetail={goParticipentDetail}
                      community={community}
                      participant={participant}
                    />
                    : <VolunteerBlock goVolunteerDetail={goVolunteerDetail}
                                      volunteer={volunteer} />
                }
              </Style.Container>
              <Style.JoinContainer>
                <Style.JoinImage source={iconJoin} />
                <Style.JoinText>「我想加入志工行列！」</Style.JoinText>
                <Style.FollowView onPress={goFB}>
                  <Style.FollowImage source={iconFollowFB} />
                </Style.FollowView>
                <Style.FollowText>
                  想要和我們一起改變南部資訊生態圈嗎？歡迎追蹤我們的 Facebook，我們會在下一屆準備開始前 PO
                  出徵才資訊！加入我們不僅有機會參與改變的過程，還可以得到寶貴的辦展經驗，認識大神們哦！
                </Style.FollowText>
                <Style.VersionText>{`Ver: ${VersionNum.appVersion}-${VersionNum.buildVersion}`}</Style.VersionText>
              </Style.JoinContainer>
            </React.Fragment>
          )
          : (<LoadingIcon size="large" color="#ffffff" />)
      }
    </Style.ScrollView>
  );

}
Community.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.title', 'mode2')
export default function (props) {
  const navigation = useNavigation();
  return <Community {...props} navigation={navigation} />
}
