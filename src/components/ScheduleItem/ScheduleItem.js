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
    paintBG: PropTypes.bool,  // is relax time ?
    title: PropTypes.string,  // speak topic
    type: PropTypes.string,   // topic type string eg. CLOUD
    name: PropTypes.string,   // speaker name
    room: PropTypes.string,   // room location string
    saved: PropTypes.bool,    // saved or not
    onSave: PropTypes.func,   // when click on save button trigger this function.
    regular: PropTypes.bool,  // regular conference schedule or not
  }
  onPressSave = () => {
    this.props.onSave();
  }
  render() {
    const { paintBG, title, type, name, room, saved, regular } = this.props;
    return (
      <ScheduleItemContainer paintBG={paintBG}>
        {
          paintBG ? <Title paintBG={paintBG}>{title}</Title> : (
            <InnerContainer>
              <Type>{type}</Type>
              <Title paintBG={paintBG}>{title}</Title>
              <Name>{name}</Name>
              <ActionContainer>
                <GeoIcon source={geoPng} />
                <Room>{room}</Room>
                {
                  regular && (
                    <StarIconTouchable onPress={this.onPressSave}>
                      <StarIconImg source={saved ? starIconChecked : starIconNormal} />
                    </StarIconTouchable>
                  )
                }
              </ActionContainer>
            </InnerContainer>)
        }
      </ScheduleItemContainer>
    )
  }
}
