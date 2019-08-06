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

export default class Schedule extends Component {
  state = {
    schedule: [],
    unconf: [],
    nowScheduleDate: '',
    savedSchedule: {},
    nowCategory: 'all',
  }

  async componentDidMount() {
    SplashScreen.hide();
    const scheduleText = await AsyncStorage.getItem('schedule');
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    const schedule = JSON.parse(scheduleText).payload.agenda;
    const unconf = JSON.parse(scheduleText).payload.talk;
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }

    const nowScheduleDate = this.props.navigation.getNestedValue(['state', 'params', 'nowScheduleDate']) || schedule[0].date;
    console.log(schedule);
    this.setState({
      unconf,
      schedule,
      nowScheduleDate,
      savedSchedule,
    });
  }

  onChangeTab = (date) => {
    this.setState({ nowScheduleDate: date });
  }

  onPressTitle = (agenda) => () => {
    const savedStatus = this.state.savedSchedule[agenda.schedule_id];
    this.props.navigation.navigate('ScheduleDetail', { agenda, savedStatus, onSave: this.onSave });
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
    const { savedSchedule, nowCategory } = this.state;
    const title = I18n.locale === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en;
    const paintBG = !Boolean(agenda.schedule_id);
    const scheduleItem = (
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
    if (paintBG) { return (<CommonScheduleItem title={title} time={agenda.duration} />); }
    if (
      (nowCategory === 'favorite' && savedSchedule[agenda.schedule_id])
      || nowCategory === 'all'
    ) {
      return scheduleItem;
    }
    return null;
  }

  onChangeCategory = nowCategory => this.setState({ nowCategory })

  renderSchedule = () => {
    const { schedule, nowScheduleDate } = this.state;
    return schedule.map((scheduleData) => (
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

  renderUnconf = () => {
    const { unconf, nowScheduleDate } = this.state;
    return unconf.map(unconfData => (
      <Style.AgendaView
        key={`schedule${unconfData.date}`}
        active={nowScheduleDate === unconfData.date}>
        {unconfData.items.map(itemData => (
          itemData.type === 'topic' ? (
            <ScheduleView key={`item${unconfData.date},${itemData.duration}`}>
              <ScheduleHeader time={itemData.duration} />
              <ScheduleItem
                title={itemData.topic}
                onPressTitle={this.onPressTitle}
                room={I18n.t('unConf.location')}
                name={itemData.speaker}
                paintBG={itemData.type === 'others'}
                tags={[]}
              />
            </ScheduleView>
          ) : (
              <CommonScheduleItem title={itemData.topic} time={itemData.duration} />
            )

        ))}
      </Style.AgendaView>
    ))
  }

  render() {
    const { schedule, nowScheduleDate, nowCategory } = this.state;
    const tabs = schedule.map(scheduleData => ({ name: scheduleData.date, value: scheduleData.date }));
    const categoryTabs = [
      { name: I18n.t('schedule.allSchedule'), value: 'all' },
      { name: I18n.t('schedule.favoriteSchedule'), value: 'favorite' },
      { name: I18n.t('unConf.title'), value: 'unconf' },
    ];
    return (
      <Style.ScheduleContainer>
        {
          tabs.length
            ? <TabDate tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={this.onChangeTab} />
            : <View />
        }

        {
          tabs.length
            ? <Tab tabs={categoryTabs} defaultActiveTab={nowCategory} onChange={this.onChangeCategory} />
            : <View />
        }

        {
          nowCategory === 'unconf'
            ? this.renderUnconf()
            : this.renderSchedule()
        }
      </Style.ScheduleContainer>
    )
  }
}
