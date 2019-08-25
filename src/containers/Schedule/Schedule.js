import React, { Component } from 'react'
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import dayjs from 'dayjs';
import apiServices from '../../api/services'
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
    unconf: {},
    nowScheduleDate: '',
    savedSchedule: {},
    nowCategory: 'all',
  }

  getSession = async () => {
    const { data: schedule } = await apiServices.get('/session');
    const newSchedule = schedule.map(scheduleData => ({ ...scheduleData, date: dayjs(scheduleData.date * 1000).format('MM/DD') }));

    this.setState({
      schedule: newSchedule,
      nowScheduleDate: newSchedule[0].date,
    });
  }

  getUnconf = async () => {
    const { data: unconf } = await apiServices.get('/unconf');

    this.setState({
      unconf: unconf,
    });
  }

  async componentDidMount() {
    this.getSession();
    this.getUnconf();

    // const scheduleText = await AsyncStorage.getItem('schedule');
    // const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    // const schedule = JSON.parse(scheduleText).payload.agenda;
    // const unconf = JSON.parse(scheduleText).payload.talk;
    // let savedSchedule = JSON.parse(savedScheduleText);
    // if (!savedSchedule) { savedSchedule = {}; }

    // const nowScheduleDate = this.props.navigation.getNestedValue(['state', 'params', 'nowScheduleDate']) || schedule[0].date;
    // console.log(schedule);
    // this.setState({
    //   unconf,
    //   schedule,
    //   nowScheduleDate,
    //   savedSchedule,
    // });
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
    const startTime = agenda.started_at && dayjs(agenda.started_at * 1000).format('HH:mm');
    const endTime = agenda.ended_at && dayjs(agenda.ended_at * 1000).format('HH:mm')

    // 非議程
    if (agenda.event && nowCategory !== 'favorite') {
      return (
        <CommonScheduleItem
          title={agenda.event}
          time={(startTime && endTime) && `${startTime} - ${endTime}`}
        />
      );
    }

    const scheduleItem = Object.keys(agenda.room).map((key) => {
      const item = agenda.room[key];
      const _startTime = item.started_at && dayjs(item.started_at * 1000).format('HH:mm');
      const _endTime = item.ended_at && dayjs(item.ended_at * 1000).format('HH:mm');

      if (nowCategory === 'favorite' && !savedSchedule[item.session_id]) return null;

      return (
        <ScheduleView>
          <ScheduleHeader
            time={`${_startTime} - ${_endTime}`}
            onSave={this.onSave(item.session_id)}
            saved={this.state.savedSchedule[item.session_id]}
          />
          <ScheduleItem
            regular
            title={I18n.locale === 'zh' ? item.topic : item.topic_e}
            onPressTitle={item.session_id ? this.onPressTitle(agenda) : () => { }}
            name={I18n.locale === 'zh' ? item.name : item.name_e}
            room={key !== 'All' && `${item.room}: ${item.location}`}
            tags={{ tags_tech: item.tags_tech, tags_design: item.tags_design, tags_other: item.tags_other }}
          />
        </ScheduleView>
      );
    });

    return scheduleItem;
  }

  onChangeCategory = nowCategory => this.setState({ nowCategory })

  renderSchedule = () => {
    const { schedule, nowScheduleDate } = this.state;

    return schedule.map((scheduleData) => (
      <Style.AgendaView
        key={`schedule_${scheduleData.date}`}
        active={nowScheduleDate === scheduleData.date}>
        {scheduleData.period.map(this.renderScheduleItem)}
      </Style.AgendaView>
    ))
  }

  renderUnconf = () => {
    const { unconf, nowScheduleDate } = this.state;
  
    return Object.keys(unconf).map((date) => {
      const unconfData = unconf[date];

      return (
        <Style.AgendaView
          key={`schedule${date}`}
          active={nowScheduleDate === date}>
          {unconfData.map(itemData => (
            <ScheduleView key={`unconf_${unconfData.date},${itemData.duration}`}>
              <ScheduleHeader time={itemData.duration} />
              <ScheduleItem
                title={itemData.title}
                onPressTitle={this.onPressTitle}
                room={I18n.t('unConf.location')}
                name={itemData.speaker}
                paintBG={false}
                tags={[]}
              />
            </ScheduleView>
          ))}
        </Style.AgendaView>
      );
    });
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
