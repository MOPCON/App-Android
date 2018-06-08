import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScheduleItemContainer, Title, Type,
  InnerContainer, Name, ActionContainer,
  Room,
} from './style';

export default class ScheduleItem extends Component {
  static propTypes = {
    paintBG: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    room: PropTypes.string,
  }
  render() {
    const { paintBG, title, type, name, room } = this.props;
    return (
      <ScheduleItemContainer paintBG={paintBG}>
        {
          paintBG ? <Title>{title}</Title> : (
            <InnerContainer>
              <Type>{type}</Type>
              <Title>{title}</Title>
              <Name>{name}</Name>
              <ActionContainer>
                <Room>{room}</Room>
              </ActionContainer>
            </InnerContainer>)
        }
      </ScheduleItemContainer>
    )
  }
}
