import React from 'react';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import Tab from '../../components/Tab/Tab';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

const tabs = [
  { name: 'day1', value: 'day1' },
  { name: 'day2', value: 'day2' }
];
const defaultActiveTab = 'day1';

export default class UnConf extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'unConf.title', 'mode1')

  state = {
    unconf: [],
    nowUnconfDate: '',
  }

  async componentDidMount() {
    const unconfText = await AsyncStorage.getItem('schedule');
    const unconf = JSON.parse(unconfText).payload.talk;
    const nowUnconfDate = this.props.navigation.getNestedValue(['state', 'params', 'nowUnconfDate']) || unconf[0].date;

    this.setState({
      unconf,
      nowUnconfDate,
    });
  }

  onChangeTab = (date) => {
    this.setState({ nowUnconfDate: date });
  }

  goToSchedule = () => {
    this.props.navigation.navigate('Schedule', { nowScheduleDate: this.state.nowUnconfDate });
  }

  onPressTitle = () => { }

  render() {
    const { unconf, nowUnconfDate } = this.state;
    const tabs = unconf.map(unconfData => ({ name: unconfData.date, value: unconfData.date }));
    const lang = I18n.locale;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.UnConfContainer>

          {
            tabs.length
              ? <Tab tabs={tabs} defaultActiveTab={nowUnconfDate} onChange={this.onChangeTab} />
              : <View />
          }
          {
            unconf.map(unconfData => (
              <Style.AgendaView
                key={`schedule${unconfData.date}`}
                active={nowUnconfDate === unconfData.date}>
                {unconfData.items.map(itemData => (
                  <View key={`item${unconfData.date},${itemData.duration}`}>
                    <ScheduleHeader time={itemData.duration} />
                    <ScheduleItem
                      title={itemData.topic}
                      onPressTitle={this.onPressTitle}
                      room={I18n.t('unConf.location')}
                      name={itemData.speaker}
                      paintBG={itemData.type === 'others'}
                    />
                  </View>
                ))}
              </Style.AgendaView>
            ))
          }
          {
            tabs.length
              ? <Button onClick={this.goToSchedule} text={I18n.t('unConf.schedule')} align="center" margin={[16, 0, 0, 0]} />
              : <View />
          }
        </Style.UnConfContainer>
      </ScrollView>
    );
  }
}