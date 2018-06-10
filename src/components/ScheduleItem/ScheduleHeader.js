import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, HeaderText } from './style';

export default class ScheduleHeader extends Component {
  static propTypes = {
    time: PropTypes.string,
  }
  render() {
    const { time } = this.props;
    return (
      <Header>
        <HeaderText>{time}</HeaderText>
      </Header>
    )
  }
}
