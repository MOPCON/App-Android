import React from 'react';
import { ScrollView, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import apiServices from '../../api/services';
import * as Style from './style';
import I18n from '../../locales';
import ScheduleView from '../../components/ScheduleItem/ScheduleView';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import TabDate from '../../components/TabDate/TabDate';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import CommonScheduleItem from '../../components/ScheduleItem/CommonScheduleItem';
import Button from '../../components/Button/Button';

// const tabs = [
//   { name: 'day1', value: 'day1' },
//   { name: 'day2', value: 'day2' }
// ];
// const defaultActiveTab = 'day1';

export default class UnConf extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'unConf.title', 'mode2')

  state = {
    unconf: {},
    nowUnconfDate: '',
  }

  getUnconfData = async () => {
    const { data: unconf } = await apiServices.get('/unconf');
    Object.keys(unconf).forEach(key => {
      unconf[key].forEach(unconfData => (unconfData.id = Math.random().toString(16).substring(2, 10)))
    });
    const nowUnconfDate = Object.keys(unconf)[0];
    console.log(unconf, nowUnconfDate);

    this.setState({ unconf, nowUnconfDate });
  }

  componentDidMount() {
    // const unconfText = await AsyncStorage.getItem('schedule');
    // const unconf = JSON.parse(unconfText).payload.talk;
    // const nowUnconfDate = this.props.navigation.getNestedValue(['state', 'params', 'nowUnconfDate']) || unconf[0].date;

    // this.setState({
    //   unconf,
    //   nowUnconfDate,
    // });
    this.getUnconfData();
  }

  onChangeTab = (nowUnconfDate) => this.setState({ nowUnconfDate });

  goToSchedule = () => {
    this.props.navigation.navigate('Schedule', { nowScheduleDate: this.state.nowUnconfDate });
  }

  onPressTitle = () => { }

  render() {
    const { unconf, nowUnconfDate } = this.state;
    const tabs = Object.keys(unconf).map(key => ({ name: key, value: key }));
    // const tabs = unconf.map(unconfData => ({ name: unconfData.date, value: unconfData.date }));
    // const lang = I18n.locale;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.UnConfContainer>

          {
            tabs.length
              ? <TabDate tabs={tabs} defaultActiveTab={nowUnconfDate} onChange={this.onChangeTab} />
              : <View />
          }
          {
            Boolean(tabs.length) &&
            unconf[nowUnconfDate].map(unconfData => (
              <ScheduleView key={unconfData.id}>
                <ScheduleHeader time={unconfData.duration} />
                <ScheduleItem
                  title={unconfData.title}
                  onPressTitle={this.onPressTitle}
                  room={I18n.t('unConf.location')}
                  name={unconfData.speaker}
                  paintBG={false}
                  tags={[]}
                />
              </ScheduleView>
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




// unconf.map(unconfData => (
//   <Style.AgendaView
//     key={`schedule${unconfData.date}`}
//     active={nowUnconfDate === unconfData.date}>
//     {unconfData.items.map(itemData => (
//       itemData.type === 'topic' ? (
//         <ScheduleView key={`item${unconfData.date},${itemData.duration}`}>
//           <ScheduleHeader time={itemData.duration} />
//           <ScheduleItem
//             title={itemData.topic}
//             onPressTitle={this.onPressTitle}
//             room={I18n.t('unConf.location')}
//             name={itemData.speaker}
//             paintBG={itemData.type === 'others'}
//             tags={[]}
//           />
//         </ScheduleView>
//       ) : (
//           <CommonScheduleItem title={itemData.topic} time={itemData.duration} />
//         )

//     ))}
//   </Style.AgendaView>
// ))