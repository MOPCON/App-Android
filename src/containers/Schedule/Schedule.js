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
  }

  async componentDidMount() {
    const scheduleText = await AsyncStorage.getItem('schedule');
    const schedule = JSON.parse(scheduleText).payload.agenda;
    this.setState({
      schedule,
      nowScheduleDate: schedule[0].date,
    });
  }

  onChangeTab = (date) => {
    this.setState({ nowScheduleDate: date });
  }

  onPressTitle = (agenda) => () => {
    this.props.navigation.navigate('ScheduleDetail', { agenda });
    // console.log('onPressTitle', agenda);
  }

  render() {
    const { schedule, nowScheduleDate } = this.state;
    const tabs = schedule.map(scheduleData => ({ name: scheduleData.date, value: scheduleData.date }));
    const lang = I18n.locale;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.ScheduleContainer>
          {
            tabs.length ?
              <Tab tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={this.onChangeTab} /> :
              <View />
          }

          {
            schedule.map(scheduleData => (
              <Style.AgendaView
                key={`schedule${scheduleData.date}`}
                active={nowScheduleDate === scheduleData.date}>
                {scheduleData.items.map(itemData => (
                  <View key={`item${scheduleData.date},${itemData.duration}`}>
                    <ScheduleHeader time={itemData.duration} />
                    {
                      itemData.agendas.map(agenda => (
                        <ScheduleItem
                          key={`agenda${agenda.schedule_id}`}
                          regular
                          title={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
                          type={agenda.type}
                          onPressTitle={this.onPressTitle(agenda)}
                          name={lang === 'zh' ? agenda.name : agenda.name_en}
                          room={agenda.location} />
                      ))
                    }
                  </View>
                ))}
              </Style.AgendaView>
            ))
          }
          {
            tabs.length ?
              <Button text="查看交流場次" align="center" margin={[16, 0, 0, 0]} /> :
              <View />
          }
        </Style.ScheduleContainer>
      </ScrollView>
    )
  }
}