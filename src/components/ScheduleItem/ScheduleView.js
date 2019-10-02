import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScheduleContainer } from './style';

const ScheduleView = ({ onPress, children, disabled }) => (
  <ScheduleContainer onPress={onPress} disabled={disabled}>
    {children}
  </ScheduleContainer>
);

ScheduleView.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
  disabled: PropTypes.bool,
};

ScheduleView.defaultProps = {
  onPress: () => { },
  children: null,
  disabled: false,
};

export default ScheduleView;