import React, { Component } from 'react'
import { ScrollView, AsyncStorage, View } from 'react-native';
import I18n from '../../locales';
import * as Style from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import NoScheduleItem from '../../components/ScheduleItem/NoScheduleItem';
import Tab from '../../components/Tab/Tab';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

export default class MySchedule extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'home.MySchedule', 'mode1')

  state = {
    schedule: [],
    nowScheduleDate: '',
    savedSchedule: {},
  }

  async componentDidMount() {
    global.qq = AsyncStorage;
    const scheduleText = await AsyncStorage.getItem('schedule');
    const schedule = JSON.parse(scheduleText).payload.agenda;
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }
    this.setState({
      schedule,
      nowScheduleDate: schedule[0].date,
      savedSchedule,
    });
  }

  goToSchedule = () => {
    this.props.navigation.goBack();
    setTimeout(() => {
      this.props.navigation.navigate('Schedule', { nowScheduleDate: this.state.nowScheduleDate });
    }, 0)
  }

  onChangeTab = (date) => {
    this.setState({ nowScheduleDate: date });
  }

  onPressTitle = (agenda) => () => {
    this.props.navigation.navigate('ScheduleDetail', { agenda });
  }

  onSave = (schedule_id) => () => {
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[schedule_id] = !savedSchedule[schedule_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  renderSchedule = (agendas) => {
    const { savedSchedule } = this.state;
    const lang = I18n.locale;
    if (agendas.length === 1 && agendas[0].schedule_id === null) {
      const agenda = agendas[0];
      return (
        <ScheduleItem
          key={`agenda${agenda.duration}`}
          regular
          paintBG
          title={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
          category={agenda.category}
          onPressTitle={this.onPressTitle(agenda)}
          name={lang === 'zh' ? agenda.name : agenda.name_en}
          onSave={() => { }}
        />
      )
    }
    const newAgendas = agendas.filter(agenda => savedSchedule[agenda.schedule_id]);
    return newAgendas.length
      ? (newAgendas.map(agenda => (
        <ScheduleItem
          key={`agenda${agenda.schedule_id}`}
          regular
          title={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
          category={agenda.category}
          onPressTitle={this.onPressTitle(agenda)}
          name={lang === 'zh' ? agenda.name : agenda.name_en}
          onSave={this.onSave(agenda.schedule_id)}
          saved={savedSchedule[agenda.schedule_id]}
          room={agenda.location} />
      )))
      : <NoScheduleItem onClick={this.goToSchedule} />;
  }

  render() {
    const { schedule, nowScheduleDate } = this.state;
    const tabs = schedule.map(scheduleData => ({ name: scheduleData.date, value: scheduleData.date }));
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.ScheduleContainer>
          {
            tabs.length ?
              <Tab tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={this.onChangeTab} /> :
              <View />
          }

          {
            schedule.map((scheduleData, scheduleIndex) => (
              <Style.AgendaView
                key={`schedule${scheduleData.date}`}
                active={nowScheduleDate === scheduleData.date}>
                {scheduleData.items.map((itemData, itemIndex) => (
                  <View key={`item${scheduleData.date},${itemData.duration}`}>
                    <ScheduleHeader time={itemData.duration} />
                    {
                      this.renderSchedule(itemData.agendas)
                    }
                  </View>
                ))}
              </Style.AgendaView>
            ))
          }
        </Style.ScheduleContainer>
      </ScrollView>
    )
  }
}