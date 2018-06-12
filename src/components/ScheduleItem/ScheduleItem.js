import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ScheduleItemContainer, Title, Type,
  InnerContainer, Name, ActionContainer,
  Room, GeoIcon, StarIcon, StarIconImg,
  StarIconTouchable,
} from './style';
import geoPng from '../../images/location.png';
import starIconNormal from '../../images/buttonStarNormal.png';
import starIconChecked from '../../images/buttonStarChecked.png';

export default class ScheduleItem extends Component {
  static propTypes = {
    paintBG: PropTypes.bool,
    title: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    room: PropTypes.string,
    saved: PropTypes.bool,
    onSave: PropTypes.func,
  }
  onPressSave = () => {
    this.props.onSave();
  }
  render() {
    const { paintBG, title, type, name, room, saved } = this.props;
    return (
      <ScheduleItemContainer paintBG={paintBG}>
        {
          paintBG ? <Title>{title}</Title> : (
            <InnerContainer>
              <Type>{type}</Type>
              <Title>{title}</Title>
              <Name>{name}</Name>
              <ActionContainer>
                <GeoIcon source={geoPng} />
                <Room>{room}</Room>
                <StarIconTouchable onPress={this.onPressSave}>
                  <StarIconImg source={saved ? starIconChecked : starIconNormal} />
                </StarIconTouchable>
              </ActionContainer>
            </InnerContainer>)
        }
      </ScheduleItemContainer>
    )
  }
}
