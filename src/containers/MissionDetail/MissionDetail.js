import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Quiz from './Quiz';
import QRCode from './QRCode';
import * as Style from './style';

export default class MissionDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, `missionDetail.${navigation.state.params.type}`, 'mode2')

  render() {
    const { id, type } = this.props.navigation.state.params;
    const { navigation } = this.props;

    return (
      <Style.MissionContainer>
        {
          type === 'quiz'
          ? (
            <Quiz id={id} />
          )
          : (
            <QRCode id={id} navigation={navigation}/>
          )
        }
      </Style.MissionContainer>
    );
  }
}