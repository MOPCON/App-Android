import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScheduleContainer } from './style';

export default class ScheduleView extends Component {
  render() {
    return (
      <ScheduleContainer>
        {this.props.children}
      </ScheduleContainer>
    )
  }
}
