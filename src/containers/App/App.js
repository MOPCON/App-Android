import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Header from './Header';
import Main from '../Main/Main';
import Schedule from '../Schedule/Schedule';
import UnConf from '../UnConf/UnConf';
import Sponsor from '../Sponsor/Sponsor';
import ScheduleDetail from '../ScheduleDetail/ScheduleDetail';
import * as theme from '../../theme';

class App extends Component {
  static navigationOptions = {
    headerStyle: {
      display: 'none'
    },
    title: '',
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1 }}>
        <Header />
        <Main navigate={navigate} />
      </View>
    );
  }
}

export default StackNavigator({
  Main: { screen: App },
  Schedule: { screen: Schedule },
  UnConf: { screen: UnConf },
  ScheduleDetail: { screen: ScheduleDetail },
  Sponsor: { screen: Sponsor },
});