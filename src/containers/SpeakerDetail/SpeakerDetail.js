import React from 'react';
import { ScrollView, TouchableOpacity, Linking } from 'react-native';
import moment from 'dayjs';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import gameServices from '../../api/gameServices';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import iconFB from '../../images/icon/icon_fb.png';
import iconGithub from '../../images/icon/icon_gh.png';
import iconTwitter from '../../images/icon/icon_tw.png';
import iconOther from '../../images/icon/icon_web.png';
import * as Style from './style';
import { useNavigation } from "@react-navigation/native";

const toTime = timestamp => moment(timestamp).format('HH:mm');
const toDate = timestamp => moment(timestamp)
const SpeakerDetail = ({ navigation }) => {

  const [ savedSchedule, setSavedSchedule ] = React.useState({})
  const [ state, setState ] = React.useState({
    speaker: {},
    isReadMore: false,
  })

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

  const { isReadMore } = state;
  const { speakerDetail } = navigation.state.params;

  const name = I18n.locale === 'en' ? speakerDetail.name_e : speakerDetail.name;
  const info = I18n.locale === 'en' ? speakerDetail.bio_e : speakerDetail.bio;
  const job = I18n.locale === 'en' ? speakerDetail.job_title_e : speakerDetail.job_title;
  const company = I18n.locale === 'en' ? speakerDetail.company_e : speakerDetail.company;
  const picture = speakerDetail.img.mobile;

  const scheduleData = {
    time: `${moment(speakerDetail.started_at * 1000).format('MM/DD HH:mm')} - ${toTime(speakerDetail.ended_at * 1000)}`,
    saved: Boolean(savedSchedule[speakerDetail.session_id]),
    title: speakerDetail.topic,
    title_e: speakerDetail.topic_e,
    speaker: speakerDetail.name,
    speaker_e: speakerDetail.name_e,
    room: speakerDetail.room,
    tags: speakerDetail.tags,
    session_id: speakerDetail.session_id,
  };

  const introProps = isReadMore ? {} : { numberOfLines: 3 };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Style.SpeakerContainer>
        <Style.ItemContainer>
          <Style.SpeakerPicture source={{ uri: picture }} />
          <Style.SpeakerText>{name}</Style.SpeakerText>
          <Style.TitleText>{job} @ {company}</Style.TitleText>
          <Style.IconContainer>
            {
              Boolean(speakerDetail.link_fb) && (
                <TouchableOpacity onPress={() => {
                  Linking.openURL(speakerDetail.link_fb)
                }}>
                  <Style.Icon source={iconFB} />
                </TouchableOpacity>
              )
            }
            {
              Boolean(speakerDetail.link_github) && (
                <TouchableOpacity onPress={() => {
                  Linking.openURL(speakerDetail.link_github)
                }}>
                  <Style.Icon source={iconGithub} />
                </TouchableOpacity>
              )
            }
            {
              Boolean(speakerDetail.link_twitter) && (
                <TouchableOpacity onPress={() => {
                  Linking.openURL(speakerDetail.link_twitter)
                }}>
                  <Style.Icon source={iconTwitter} />
                </TouchableOpacity>
              )
            }
            {
              Boolean(speakerDetail.link_other) && (
                <TouchableOpacity onPress={() => {
                  Linking.openURL(speakerDetail.link_other)
                }}>
                  <Style.Icon source={iconOther} />
                </TouchableOpacity>
              )
            }
          </Style.IconContainer>
        </Style.ItemContainer>

        <Style.Header>
          <Style.SpeakerText>{I18n.t('speaker.about')}</Style.SpeakerText>
          <Style.ReadMoreView onPress={() => setState({ ...state, isReadMore: !state.isReadMore })}>
            <Style.ReadMoreText>{I18n.t('speaker.more')}</Style.ReadMoreText>
          </Style.ReadMoreView>
        </Style.Header>
        <Style.Intro {...introProps}>
          {info}
        </Style.Intro>
        <ScheduleCard scheduleData={scheduleData} onPressTitle={onPressTitle} onSave={onSave} />
      </Style.SpeakerContainer>
    </ScrollView>
  );
}

SpeakerDetail.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.title', 'mode2')
export default function (props) {
  const navigation = useNavigation();
  return <SpeakerDetail {...props} navigation={navigation} />
}
