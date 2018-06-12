import React, { Component } from 'react'
import { ScheduleContainer, ScheduleScrollView } from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';

export default class Schedule extends Component {
  render() {
    return (
      <ScheduleScrollView>
        <ScheduleContainer>
          <ScheduleHeader time="08:00 ~ 09:00" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            type="CLOUD"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            type="CLOUD"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            type="CLOUD"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            type="CLOUD"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            type="CLOUD"
            name="田哲禹"
            room="R1 : 一廳" />
        </ScheduleContainer>
      </ScheduleScrollView>
    )
  }
}