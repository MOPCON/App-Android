import React, { Component } from 'react';
import Button from '../Button/Button';
import I18n from '../../locales';
import * as Style from './style';

export default class ScheduleItem extends Component {
  render() {
    return (
      <Style.ScheduleContainer disabled>
        <Style.NTitle>
          {I18n.t('schedule.noSchedule')}
        </Style.NTitle>
        <Button
          color="primary"
          onClick={this.props.onClick}
          text={I18n.t('schedule.goSchedule')}
          align="center" margin={[0, 0, 20, 0]}
        />
      </Style.ScheduleContainer>
    )
  }
}
