import React, { Component } from 'react'
import { ScrollView, AsyncStorage, View } from 'react-native';
import I18n from '../../locales';
import * as Style from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import Tab from '../../components/Tab/Tab';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

export default class Schedule extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'home.schedule', 'mode1')

  state = {
    schedule: [],
    nowScheduleDate: '',
    savedSchedule: {},
  }

  async componentDidMount() {
    global.qq = AsyncStorage;
    const scheduleText = await AsyncStorage.getItem('schedule');
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    const schedule = JSON.parse(scheduleText).payload.agenda;
    let savedSchedule = JSON.parse(savedScheduleText);
    console.log(savedSchedule);
    if (!savedSchedule) { savedSchedule = {}; }

    const nowScheduleDate = this.props.navigation.getNestedValue(['state', 'params', 'nowScheduleDate']) || schedule[0].date;

    this.setState({
      schedule,
      nowScheduleDate,
      savedSchedule,
    });
  }

  onChangeTab = (date) => {
    this.setState({ nowScheduleDate: date });
  }

  onPressTitle = (agenda) => () => {
    this.props.navigation.navigate('ScheduleDetail', { agenda });
    // console.log('onPressTitle', agenda);
  }

  onSave = (schedule_id) => () => {
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[schedule_id] = !savedSchedule[schedule_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  goToUnConf = () => {
    this.props.navigation.navigate('UnConf', { nowUnconfDate: this.state.nowScheduleDate });
  }

  renderScheduleItem = (agenda) => (
    <ScheduleItem
      key={`agenda${agenda.schedule_id || agenda.schedule_topic}`}
      regular
      paintBG={!Boolean(agenda.schedule_id)}
      title={I18n.locale === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
      type={agenda.type}
      onPressTitle={agenda.schedule_id ? this.onPressTitle(agenda) : () => { }}
      name={I18n.locale === 'zh' ? agenda.name : agenda.name_en}
      onSave={this.onSave(agenda.schedule_id)}
      saved={this.state.savedSchedule[agenda.schedule_id]}
      room={agenda.location} />
  )

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
            schedule.map((scheduleData) => (
              <Style.AgendaView
                key={`schedule${scheduleData.date}`}
                active={nowScheduleDate === scheduleData.date}>
                {scheduleData.items.map((itemData) => (
                  <View key={`item${scheduleData.date},${itemData.duration}`}>
                    <ScheduleHeader time={itemData.duration} />
                    {
                      itemData.agendas.map(this.renderScheduleItem)
                    }
                  </View>
                ))}
              </Style.AgendaView>
            ))
          }
          {
            tabs.length ?
              <Button onClick={this.goToUnConf} text={I18n.t('community.unconference')} align="center" margin={[16, 0, 0, 0]} /> :
              <View />
          }
        </Style.ScheduleContainer>
      </ScrollView>
    )
  }
}