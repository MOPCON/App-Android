import React, { Component } from 'react'
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'dayjs';
import apiServices from '../../api/services'
import I18n from '../../locales';
import * as Style from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import ScheduleView from '../../components/ScheduleItem/ScheduleView';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import CommonScheduleItem from '../../components/ScheduleItem/CommonScheduleItem';

import Tab from '../../components/Tab/Tab';
import TabDate from '../../components/TabDate/TabDate';

const toTime = timestamp => moment(timestamp).format('HH:mm');

const normalizeScheduleData = (originScheduleData, savedSchedule) => ({
  ...originScheduleData,
  time: `${toTime(originScheduleData.started_at * 1000)} - ${toTime(originScheduleData.ended_at * 1000)}`,
  saved: Boolean(savedSchedule[originScheduleData.session_id]),
  speaker: originScheduleData.name,
  speaker_e: originScheduleData.name_e,
  title: originScheduleData.topic,
  title_e: originScheduleData.topic_e,
});

const normalizePeriodData = originPeriodData => ({
  title: originPeriodData.event,
  time: `${toTime(originPeriodData.started_at * 1000)} - ${toTime(originPeriodData.ended_at * 1000)}`,
});

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
    const { data: unconf } = await apiServices.get('/unconf');
    this.setState({
      schedule,
      unconf,
      nowScheduleDate: schedule[0].date,
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
    // this.getUnconf();
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }
    this.setState({ savedSchedule });
  }

  onChangeTab = (date) => {
    this.setState({ nowScheduleDate: date });
  }

  onPressTitle = ({ session_id }) => {
    const savedStatus = this.state.savedSchedule[session_id];
    this.props.navigation.navigate('ScheduleDetail', { session_id, savedStatus, onSave: this.onSave });
  }

  onSave = ({ session_id }) => {
    const savedSchedule = {
      ...this.state.savedSchedule,
    };
    savedSchedule[session_id] = !savedSchedule[session_id];
    this.setState({ savedSchedule });
    AsyncStorage.setItem('savedschedule', JSON.stringify(savedSchedule));
  }

  goToUnConf = () => {
    this.props.navigation.navigate('UnConf', { nowUnconfDate: this.state.nowScheduleDate });
  }

  onChangeCategory = nowCategory => this.setState({ nowCategory })

  renderSchedule = () => {
    const { onPressTitle, onSave } = this;
    const { schedule, nowScheduleDate, savedSchedule } = this.state;

    const nowSchedule = schedule
      .find(schedulePeriod => schedulePeriod.date === nowScheduleDate);
    if (!nowSchedule) { return (<View />); }
    return nowSchedule.period.map((periodData) => {
      if (periodData.event) {
        const key = nowSchedule.date + periodData.started_at + periodData.event;
        return (<CommonScheduleItem key={key} scheduleData={normalizePeriodData(periodData)} />);
      }
      return periodData.room
        .map((scheduleData) => {
          return normalizeScheduleData(scheduleData, savedSchedule)
        })
        .map(scheduleData => (
          <ScheduleCard
            key={scheduleData.session_id}
            scheduleData={scheduleData}
            onPressTitle={onPressTitle}
            onSave={onSave}
          />
        ));
    }).reduce((acc, val) => acc.concat(val), []);
  }

  renderFavorite = () => {
    const { onPressTitle, onSave } = this;
    const { schedule, nowScheduleDate, savedSchedule } = this.state;

    const nowSchedule = schedule
      .find(schedulePeriod => schedulePeriod.date === nowScheduleDate);
    if (!nowSchedule) { return (<View />); }
    return nowSchedule.period.map((periodData) => {
      if (periodData.event) {
        const key = nowSchedule.date + periodData.started_at + periodData.event;
        return (<CommonScheduleItem key={key} scheduleData={normalizePeriodData(periodData)} />);
      }
      return periodData.room
        .filter(scheduleData => savedSchedule[scheduleData.session_id])
        .map((scheduleData) => {
          return normalizeScheduleData(scheduleData, savedSchedule)
        })
        .map(scheduleData => (
          <ScheduleCard
            key={scheduleData.session_id}
            scheduleData={scheduleData}
            onPressTitle={onPressTitle}
            onSave={onSave}
          />
        ));
    }).reduce((acc, val) => acc.concat(val), []);
  }

  renderUnconf = () => {
    const { onPressTitle, onSave } = this;
    const { unconf, nowScheduleDate, savedSchedule } = this.state;

    const nowSchedule = unconf
      .find(schedulePeriod => schedulePeriod.date === nowScheduleDate);
    if (!nowSchedule) { return (<View />); }
    return nowSchedule.period.map((periodData) => {
      if (periodData.event) {
        const key = nowSchedule.date + periodData.started_at + periodData.event;
        return (<CommonScheduleItem key={key} scheduleData={normalizePeriodData(periodData)} />);
      }
      return periodData.room
        .map((scheduleData) => {
          return normalizeScheduleData(scheduleData, savedSchedule)
        })
        .map(scheduleData => (
          <ScheduleCard
            key={scheduleData.session_id}
            scheduleData={scheduleData}
            onPressTitle={onPressTitle}
            onSave={onSave}
          />
        ));
    }).reduce((acc, val) => acc.concat(val), []);
  }

  render() {
    const { schedule, nowScheduleDate, nowCategory } = this.state;
    const tabs = schedule.map(scheduleData => ({ name: moment(scheduleData.date * 1000).format('MM-DD'), value: scheduleData.date }));
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
          nowCategory === 'all' && this.renderSchedule()
        }

        {
          nowCategory === 'favorite' && this.renderFavorite()
        }
        {
          nowCategory === 'unconf' && this.renderUnconf()
        }
      </Style.ScheduleContainer>
    )
  }
}
