import React from 'react';
import I18n from '../../locales';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import apiServices from '../../api/services'
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import starIconNormal from '../../images/buttonStarNormal.png';
import starIconChecked from '../../images/buttonStarChecked.png';

export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const options = NavigationOptions(navigation, 'scheduleDetail.title', 'mode2');
    const agenda = navigation.getParam('agenda', {});
    const savedStatus = navigation.getParam('savedStatus', {});
    const onSave = navigation.getParam('onSave', () => { });
    const onPress = () => {
      onSave(agenda.schedule_id)();
      navigation.setParams({ savedStatus: !savedStatus });
    }
    options.headerRight = (
      <Style.StarIconTouchable onPress={onPress}>
        <Style.StarIconImg source={savedStatus ? starIconChecked : starIconNormal} />
      </Style.StarIconTouchable>
    );
    return options;
  }

  state = {
    session: {}
  }

  async componentDidMount() {
    const session_id = this.props.navigation.getParam('session_id', {});

    const { data: session } = await apiServices.get(`/session/${session_id}`);
    this.setState({
      session,
    });
  }

  render() {
    const { navigation } = this.props;
    const { session } = this.state;
    const lang = I18n.locale;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.IntroContainer>
            <Style.SpeakerContainer>
              <Style.SpeakerImg source={{ uri: session.photo_for_session_mobile }} />
              <Style.NameText>{lang === 'zh' ? session.name : session.name_e}</Style.NameText>
              <Style.JobText>{`${lang === 'zh' ? session.job_title : session.job_title_e}@${lang === 'zh' ? session.company : session.company_e}`}</Style.JobText>
            </Style.SpeakerContainer>
            <Style.SpeechItemContainer>
              <Style.Title>
                {lang === 'zh' ? session.topic : session.topic_e}
              </Style.Title>
              <Style.CategoryText>
                {[...(session.tags_tech || []), ...(session.tags_design || []), ...(session.tags_other || [])].join(', ')}
              </Style.CategoryText>
            </Style.SpeechItemContainer>
            <Style.Line />
            <Style.DesText>
              {
                lang === 'zh' ? session.schedule_info : session.schedule_info_en
              }
            </Style.DesText>
          </Style.IntroContainer>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}

/*



<Style.StarIconTouchable onPress={this.onSave(agenda.schedule_id)}>
                  <Style.StarIconImg source={savedSchedule[agenda.schedule_id] ? starIconChecked : starIconNormal} />
                </Style.StarIconTouchable>


<SpeechItem
  color="inverse"
  category={agenda.category}
  topic={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
  saved={savedSchedule[agenda.schedule_id]}
  onSave={this.onSave(agenda.schedule_id)}
/>

<Style.IntroContainer>
  <SpeakerItem
    name={lang === 'zh' ? agenda.name : agenda.name_en}
    job={agenda.job}
    company={agenda.company}
    picture={agenda.picture}
  />
</Style.IntroContainer>


*/