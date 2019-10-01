import React from 'react';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import apiServices from '../../api/services';
import gameServices from '../../api/gameServices';
import * as Style from './style';
import I18n from '../../locales';
import moment from 'dayjs';
import { normalizePeriodData, normalizeScheduleData } from '../../utils/normalizeSchedule';
import TabDate from '../../components/TabDate/TabDate';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import CommonScheduleItem from '../../components/ScheduleItem/CommonScheduleItem';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Button from '../../components/Button/Button';

// const tabs = [
//   { name: 'day1', value: 'day1' },
//   { name: 'day2', value: 'day2' }
// ];
// const defaultActiveTab = 'day1';

export default class UnConf extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'unConf.title', 'mode2')

  state = {
    unconf: [],
    nowUnconfDate: '',
    savedSchedule: {},
  }

  getSession = async () => {
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let savedSchedule = JSON.parse(savedScheduleText);
    if (!savedSchedule) { savedSchedule = {}; }
    const { data: unconf } = await apiServices.get('/unconf');
    this.setState({
      unconf,
      nowUnconfDate: unconf[0].date,
      savedSchedule
    });
  }

  onSave = ({ session_id }) => {
    const s = {
      ...this.state.savedSchedule,
    };
    s[session_id] = !s[session_id];
    this.setState({ savedSchedule: s });
    if(global.enable_game){
      gameServices.post('/mySession', {session_id, action: s[session_id] ? 'add' : 'remove'});
    }
    AsyncStorage.setItem('savedschedule', JSON.stringify(s));
  }

  componentDidMount() {
    this.getSession();
  }

  renderUnconf = () => {
    const { onPressTitle, onSave } = this;
    const { unconf, nowUnconfDate, savedSchedule } = this.state;

    const nowSchedule = unconf
      .find(schedulePeriod => schedulePeriod.date === nowUnconfDate);
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
            onSave={onSave}
          />
        ));
    }).reduce((acc, val) => acc.concat(val), []);
  }

  onChangeTab = (nowUnconfDate) => this.setState({ nowUnconfDate });

  render() {
    const { unconf, nowUnconfDate } = this.state;
    const tabs = unconf.map(scheduleData => ({ name: moment(scheduleData.date * 1000).format('MM/DD'), value: scheduleData.date }));
    return (
      <Style.UnConfScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <Style.UnConfContainer>
          {
            !Boolean(tabs.length) && <LoadingIcon size="large" color="#ffffff" />
          }
          {
            Boolean(tabs.length)
              ? <TabDate tabs={tabs} defaultActiveTab={nowUnconfDate} onChange={this.onChangeTab} />
              : <View />
          }
          {
            Boolean(tabs.length) && this.renderUnconf()
          }
        </Style.UnConfContainer>
      </Style.UnConfScrollView>
    );
  }
}
