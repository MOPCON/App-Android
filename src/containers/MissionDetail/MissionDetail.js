import React, { Component } from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { STATUS } from '../MissionTable/Missiontable';
import Quiz from './Quiz';
import QRCode from './QRCode';
import * as Style from './style';

export default class MissionDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, `missionDetail.${navigation.state.params.type}`, 'mode2')

  state = {
    quiz: {},
    type: null,
  }

  componentDidMount() {
    const { quiz, type } = this.props.navigation.state.params;

    this.setState({
      quiz, type,
    });
  }

  render() {
    const { quiz, type } = this.state;
    const { navigation } = this.props;

    return (
      <Style.MissionContainer>
        {
          type === 'quiz'
          ? (
            <Quiz quiz={quiz} />
          )
          : (
            <QRCode task={quiz} navigation={navigation}/>
          )
        }
      </Style.MissionContainer>
    );
  }
}