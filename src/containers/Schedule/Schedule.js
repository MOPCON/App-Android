import React, { Component } from 'react'
import { ScheduleContainer } from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';

export default class Schedule extends Component {
  render() {
    return (
      <ScheduleContainer>
        <ScheduleHeader time="08:00 ~ 09:00" />
        <ScheduleItem 
        title="Innovate width New Technologies on Google" 
        type="CLOUD" 
        name="田與折" 
        room="R1 : 一廳" />
      </ScheduleContainer>
    )
  }
}