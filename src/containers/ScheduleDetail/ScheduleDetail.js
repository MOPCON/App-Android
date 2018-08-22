import React from 'react';
import I18n from '../../locales';
import { ScrollView } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import SpeechItem from '../../components/SpeechItem/SpeechItem';
import SpeakerItem from '../../components/SpeakerItem/SpeakerItem';

export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'scheduleDetail.title', 'mode2')
  render() {
    const { navigation } = this.props;
    const lang = I18n.locale;
    const agenda = navigation.getParam('agenda', {});
    console.log(agenda);
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.HeaderImage source={{ uri: 'https://picsum.photos/700/1000/?image=1063' }} />
          <Style.IntroContainer>
            <Style.SpeechItemContainer>
              <SpeechItem
                color="inverse"
                type={agenda.type}
                topic={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
              />
            </Style.SpeechItemContainer>
            <Style.DesText>
              {
                lang === 'zh' ? agenda.schedule_info : agenda.schedule_info_en
              }
            </Style.DesText>
          </Style.IntroContainer>
          <Style.IntroContainer>
            <SpeakerItem
              name={lang === 'zh' ? agenda.name : agenda.name_en}
              job={agenda.job}
              info={lang === 'zh' ? agenda.info : agenda.info_en}
              picture={agenda.picture}
            />
          </Style.IntroContainer>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}