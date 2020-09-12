import React from 'react'
import moment from 'dayjs';
import { ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import gameServices from '../../api/gameServices';
import I18n from '../../locales';
import * as Style from './style';
import { useNavigation } from "@react-navigation/native";

const toTime = timestamp => moment(timestamp).format('HH:mm')

const normalizeScheduleData = (originScheduleData, savedSchedule) => ({
  ...originScheduleData,
  time: `${toTime(originScheduleData.started_at * 1000)} - ${toTime(originScheduleData.endeded_at * 1000)}`,
  saved: Boolean(savedSchedule[originScheduleData.session_id]),
  speaker: originScheduleData.name,
  speaker_e: originScheduleData.name_e,
  title: originScheduleData.topic_name,
  title_e: originScheduleData.topic_name_e,
});

const SponsorDetail = ({ navigation }) => {

  const [ savedSchedule, setSavedSchedule ] = React.useState({})

  React.useEffect(() => {
    async function fetchSavedSchedule() {
      const savedScheduleText = await AsyncStorage.getItem('savedschedule');
      let savedSchedule = JSON.parse(savedScheduleText);
      if (!savedSchedule) {
        savedSchedule = {};
      }
      setSavedSchedule(savedSchedule);
    }

    fetchSavedSchedule();
  }, [])

  const openLink = (url) => {
    Linking.openURL(url);
  }

  const onPressTitle = ({ session_id }) => {
    const savedStatus = savedSchedule[session_id];
    navigation.navigate('ScheduleDetail', { session_id, savedStatus, onSave });
  }

  const onSave = ({ session_id }) => {
    const _savedSchedule = {
      ...savedSchedule,
    };
    _savedSchedule[session_id] = !_savedSchedule[session_id];
    setSavedSchedule(_savedSchedule);
    if (global.enable_game) {
      gameServices.post('/mySession', { session_id, action: _savedSchedule[session_id] ? 'add' : 'remove' });
    }
    AsyncStorage.setItem('savedschedule', JSON.stringify(_savedSchedule));
  }

  const { sponsorDetail } = navigation.state.params;
  const name = I18n.locale === 'zh' ? sponsorDetail.name : sponsorDetail.name_e;
  const info = I18n.locale === 'zh' ? sponsorDetail.about_us : sponsorDetail.about_us_e;
  const logo = sponsorDetail.logo_path;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Style.SDContainer>
        <Style.CardView>
          <Style.CardImg
            source={{ uri: logo }}
          />
        </Style.CardView>
        <Style.SponsorName>
          {name}
        </Style.SponsorName>
        {
          Boolean(info) && (
            <React.Fragment>
              <Style.SplitText>關於廠商</Style.SplitText>
              <Style.SponsorDesc>
                {info}
              </Style.SponsorDesc>
            </React.Fragment>
          )
        }
        {
          Boolean(sponsorDetail.speaker_information.length) && <Style.SplitText>贊助場次</Style.SplitText>
        }
        {
          sponsorDetail.speaker_information
            .map((d) => (normalizeScheduleData(d, savedSchedule)))
            .map(scheduleData => (
              <ScheduleCard key={scheduleData.title_e} scheduleData={scheduleData}
                            onPressTitle={onPressTitle} onSave={onSave} />
            ))
        }
        {
          Boolean(sponsorDetail.official_website)
          && (
            <Style.MoreButton onPress={() => openLink(sponsorDetail.official_website)}>
              <Style.MoreText>{I18n.t('sponsor.more')}</Style.MoreText>
            </Style.MoreButton>
          )
        }

      </Style.SDContainer>
    </ScrollView>
  );
}
SponsorDetail.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.info', 'mode2')
export default function (props) {
  const navigation = useNavigation();
  return <SponsorDetail {...props} navigation={navigation} />
}
