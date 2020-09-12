import React, { Component } from 'react';
import I18n from '../../locales';
import { ScrollView } from 'react-native';
import apiServices from '../../api/services';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';

const Speaker = ({ navigation }) => {
  const [ state, setState ] = React.useState({
    speaker: []
  })

  const goDetail = (speakerDetail) => {
    navigation.navigate('SpeakerDetail', { speakerDetail });
  }

  const getSpeakers = async () => {
    const { data: speaker } = await apiServices.get('/speaker');
    setState({ speaker });
  }

  React.useEffect(() => {
    getSpeakers();
  }, [])

  const _renderSpeaker = () => {
    const { speaker } = state;

    return speaker.map((s, index) => {
      const props = {
        name: I18n.locale === 'en' ? s.name_e : s.name,
        job: I18n.locale === 'en' ? s.job_title_e : s.job_title,
        company: I18n.locale === 'en' ? s.company_e : s.company,
        picture: s.img.mobile,
        tags: s.tags,
      };

      return (
        <Style.Card key={`speaker_${index}`} onPress={() => goDetail(s)}>
          <SpeakerItem {...props} />
        </Style.Card>
      );
    })
  }

  const { speaker } = state;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Style.SpeakerContainer>
        {
          speaker.length
            ? _renderSpeaker()
            : (<LoadingIcon size="large" color="#ffffff" />)
        }
      </Style.SpeakerContainer>
    </ScrollView>
  );

}

Speaker.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'speaker.list', 'mode2');
export default Speaker;
