import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import geoPng from '../../images/location.png';
import TagBlock from '../TagBlock/TagBlock';

const ScheduleItem = ({ title, speaker, room, tags, onPressTitle }) => (
  <Style.ScheduleItemContainer>
    <Style.InnerContainer>
      <Style.TitleTouchable onPress={onPressTitle}>
        <Style.Title>{title}</Style.Title>
      </Style.TitleTouchable>
      <TagBlock tags={tags} />
      <Style.ActionContainer>
        <Style.Name>{speaker}</Style.Name>
        {
          room && (
            <Style.GeoContainer>
              <Style.GeoIcon source={geoPng} />
              <Style.Room>{room}</Style.Room>
            </Style.GeoContainer>
          )
        }
      </Style.ActionContainer>
    </Style.InnerContainer>
  </Style.ScheduleItemContainer>
);

ScheduleItem.propTypes = {
  title: PropTypes.string,  // speak topic
  speaker: PropTypes.string,   // speaker name
  room: PropTypes.string,   // room location string
  tags: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string,
    name: PropTypes.string,
  })),
  onPressTitle: PropTypes.func,
};

ScheduleItem.defaultProps = {
  title: '',
  speaker: '',
  room: '',
  tags: [{ color: '', name: '' }],
  onPressTitle: () => { },
};
