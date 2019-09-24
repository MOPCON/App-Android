import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScheduleContainer } from './style';

const ScheduleView = ({ onPress, children }) => (
  <ScheduleContainer onPress={onPress}>
    {children}
  </ScheduleContainer>
);

ScheduleView.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
};

ScheduleView.defaultProps = {
  onPress: () => { },
  children: null,
};

export default ScheduleView;