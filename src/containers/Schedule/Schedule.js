import React, { Component } from 'react'
import { View } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-community/async-storage';
import { normalizeScheduleData, normalizePeriodData } from '../../utils/normalizeSchedule';
import moment from 'dayjs';
import apiServices from '../../api/services';
import gameServices from '../../api/gameServices';
import I18n from '../../locales';
import * as Style from './style';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import CommonScheduleItem from '../../components/ScheduleItem/CommonScheduleItem';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';

import Tab from '../../components/Tab/Tab';
import TabDate from '../../components/TabDate/TabDate';

const Schedule = ({navigation}) => {
  const [ state, setState ] = React.useState({
    schedule: [],
    unconf: [],
    nowScheduleDate: '',
    nowCategory: 'all',
  })

  const [savedSchedule, setSaveSchedule] = React.useState({})

  React.useEffect(() => {
    const getSession = async () => {
      const [
        { data: schedule },
        { data: unconf }
      ] = await Promise.all([
        apiServices.get('/session'),
        apiServices.get('/unconf')
      ]);

      setState({
        ...state,
        schedule,
        unconf,
        nowScheduleDate: schedule[0].date,
      });
    }

    getSession();
  }, [])

  React.useEffect(()=>{
    const loadSavedSession = async () => {
      const savedScheduleText = await AsyncStorage.getItem('savedschedule');
      let savedSchedule = JSON.parse(savedScheduleText);
      if (!savedSchedule) {
        savedSchedule = {};
      }
      setSaveSchedule(savedSchedule);
    }

    loadSavedSession();
  },[])
  
  const onChangeTab = (date) => {
    setState({...state, nowScheduleDate: date});
  }

  const onPressTitle = ({session_id}) => {
    const savedStatus = savedSchedule[session_id];
    navigation.navigate('ScheduleDetail', {session_id, savedStatus, onSave});
  }

  const onSave = ({session_id}) => {
    const s = savedSchedule
    s[session_id] = !s[session_id];
    setState({...state, savedSchedule: s});
    if (global.enable_game) {
      gameServices.post('/mySession', {session_id, action: s[session_id] ? 'add' : 'remove'});
    }
    AsyncStorage.setItem('savedschedule', JSON.stringify(s));
  }

  const goToUnConf = () => {
    navigation.navigate('UnConf', {nowUnconfDate: state.nowScheduleDate});
  }

  const onChangeCategory = nowCategory => setState({...state, nowCategory})

  const _renderSchedule = () => {
    const {schedule, nowScheduleDate} = state;

    const nowSchedule = schedule
      .find(schedulePeriod => schedulePeriod.date === nowScheduleDate);
    if (!nowSchedule) {
      return (<View/>);
    }
    return nowSchedule.period.map((periodData) => {
      if (periodData.event) {
        const key = nowSchedule.date + periodData.started_at + periodData.event;
        return (<CommonScheduleItem key={key} scheduleData={normalizePeriodData(periodData)}/>);
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

  const _renderFavorite = () => {
    const {schedule, nowScheduleDate} = state;

    const nowSchedule = schedule
      .find(schedulePeriod => schedulePeriod.date === nowScheduleDate);
    if (!nowSchedule) {
      return (<View/>);
    }
    return nowSchedule.period.map((periodData) => {
      if (periodData.event) {
        const key = nowSchedule.date + periodData.started_at + periodData.event;
        return (<CommonScheduleItem key={key} scheduleData={normalizePeriodData(periodData)}/>);
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

  const _renderUnconf = () => {
    const {unconf, nowScheduleDate} = state;

    const nowSchedule = unconf
      .find(schedulePeriod => schedulePeriod.date === nowScheduleDate);
    if (!nowSchedule) {
      return (<View/>);
    }
    return nowSchedule.period.map((periodData) => {
      if (periodData.event) {
        const key = nowSchedule.date + periodData.started_at + periodData.event;
        return (<CommonScheduleItem key={key} scheduleData={normalizePeriodData(periodData)}/>);
      }
      return periodData.room
        .map((scheduleData) => {
          return normalizeScheduleData(scheduleData, savedSchedule)
        })
        .map(scheduleData => (
          <ScheduleCard
            key={scheduleData.session_id}
            scheduleData={scheduleData}
            /* onPressTitle={goToUnConf} */
            onSave={onSave}
          />
        ));
    }).reduce((acc, val) => acc.concat(val), []);
  }

  const {schedule, nowScheduleDate, nowCategory} = state;
  const tabs = schedule.map(scheduleData => ({
    name: moment(scheduleData.date * 1000).format('MM/DD'),
    value: scheduleData.date
  }));
  const categoryTabs = [
    {name: I18n.t('schedule.allSchedule'), value: 'all'},
    {name: I18n.t('schedule.favoriteSchedule'), value: 'favorite'},
    {name: I18n.t('unConf.title'), value: 'unconf'},
  ];
  return (
    <Style.ScheduleContainer>
      {
        !schedule.length && <LoadingIcon size="large" color="#ffffff"/>
      }

      {
        tabs.length
          ? <TabDate tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={onChangeTab}/>
          : <View/>
      }

      {
        tabs.length
          ? <Tab tabs={categoryTabs} defaultActiveTab={nowCategory} onChange={onChangeCategory}/>
          : <View/>
      }

      {
        nowCategory === 'all' && _renderSchedule()
      }

      {
        nowCategory === 'favorite' && _renderFavorite()
      }
      {
        nowCategory === 'unconf' && _renderUnconf()
      }
    </Style.ScheduleContainer>
  )
}

export default function (props) {
  const navigation = useNavigation();
  return <Schedule {...props} navigation={navigation}/>
}
