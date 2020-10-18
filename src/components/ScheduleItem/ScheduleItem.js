import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import geoPng from '../../images/location.png';
import { TagContent } from '../TagBlock/TagBlock';
import { DontRecord, IsSponsor, Keynote } from "../../containers/ScheduleDetail/InnerTag";

const ScheduleItem = ({ title, speaker, room, tags, is_keynote, recordable, sponsor_info}) => (
  <Style.ScheduleItemContainer>
    <Style.InnerContainer>
      <Style.Title>{title}</Style.Title>
      <Style.InnerTagContainer>
        {is_keynote ? <Keynote /> : null}
        {!recordable ? <DontRecord /> : null}
        {sponsor_info ? <IsSponsor /> : null}
        <TagContent tags={tags} />
      </Style.InnerTagContainer>
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
  is_keynote: PropTypes.bool,
  recordable: PropTypes.bool,
  sponsor_info: PropTypes.object,
};

ScheduleItem.defaultProps = {
  title: '',
  speaker: '',
  room: '',
  tags: [{ color: '', name: '' }],
  is_keynote: false,
  recordable: true,
  sponsor_info: null,
};

export default ScheduleItem;
