import React, { Component } from 'react'
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import * as Style from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import ScheduleView from '../../components/ScheduleItem/ScheduleView';
import CommonScheduleItem from '../../components/ScheduleItem/CommonScheduleItem';

import Tab from '../../components/Tab/Tab';
import TabDate from '../../components/TabDate/TabDate';
import Button from '../../components/Button/Button';

export default class Schedule extends Component {
  state = {
    schedule: [],
    nowScheduleDate: '',
    savedSchedule: {},
    nowCategory: 'all',
  }

  async componentDidMount() {
    SplashScreen.hide();
    const scheduleText = await AsyncStorage.getItem('schedule');
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    const schedule = JSON.parse(scheduleText).payload.agenda;
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }

    const nowScheduleDate = this.props.navigation.getNestedValue(['state', 'params', 'nowScheduleDate']) || schedule[0].date;
    console.log(schedule);
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

  renderScheduleItem = (agenda) => {
    const title = I18n.locale === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en;
    const paintBG = !Boolean(agenda.schedule_id);
    if (paintBG) { return (<CommonScheduleItem title={title} time={agenda.duration} />); }
    return (
      <ScheduleView key={`agenda${agenda.schedule_id || agenda.schedule_topic}`}>
        <ScheduleHeader
          time={agenda.duration}
          onSave={this.onSave(agenda.schedule_id)}
          saved={this.state.savedSchedule[agenda.schedule_id]}
        />
        <ScheduleItem
          regular
          title={title}
          category={agenda.category}
          onPressTitle={agenda.schedule_id ? this.onPressTitle(agenda) : () => { }}
          name={I18n.locale === 'zh' ? agenda.name : agenda.name_en}
          room={agenda.location} />
      </ScheduleView>
    );
  }

  onChangeCategory = nowCategory => this.setState({ nowCategory })

  render() {
    const { schedule, nowScheduleDate, nowCategory } = this.state;
    const tabs = schedule.map(scheduleData => ({ name: scheduleData.date, value: scheduleData.date }));
    const categoryTabs = [
      { name: I18n.t('schedule.allSchedule'), value: 'all' },
      { name: I18n.t('schedule.favoriteSchedule'), value: 'favorite' },
    ];
    return (
      <Style.ScheduleContainer>
        {
          tabs.length ?
            <TabDate tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={this.onChangeTab} /> :
            <View />
        }

        <Tab tabs={categoryTabs} defaultActiveTab={nowCategory} onChange={this.onChangeCategory} />

        {
          schedule.map((scheduleData) => (
            <Style.AgendaView
              key={`schedule${scheduleData.date}`}
              active={nowScheduleDate === scheduleData.date}>
              {scheduleData.items.map((itemData) => (
                <View key={`item${scheduleData.date},${itemData.duration}`}>
                  {
                    itemData.agendas.map(this.renderScheduleItem)
                  }
                </View>
              ))}
            </Style.AgendaView>
          ))
        }
      </Style.ScheduleContainer>
    )
  }
}


// {
//   tabs.length ?
//     <Button onClick={this.goToUnConf} text={I18n.t('community.unconference')} align="center" margin={[16, 0, 0, 0]} /> :
//     <View />
// }