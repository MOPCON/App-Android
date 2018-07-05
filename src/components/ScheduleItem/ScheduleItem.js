import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import { TouchableOpacity } from 'react-native';
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
    onPressTitle: PropTypes.func,
  }

  onPressSave = () => {
    this.props.onSave();
  }

  onPressTitle = () => {
    this.props.onPressTitle();
  }

  render() {
    const { paintBG, title, type, name, room, saved, regular } = this.props;
    return (
      <Style.ScheduleItemContainer paintBG={paintBG}>
        {
          paintBG ? <Style.Title paintBG={paintBG}>{title}</Style.Title> : (
            <Style.InnerContainer>
              <Style.Type>{type}</Style.Type>
              <TouchableOpacity onPress={this.onPressTitle}>
                <Style.Title paintBG={paintBG}>{title}</Style.Title>
              </TouchableOpacity>
              <Style.Name>{name}</Style.Name>
              <Style.ActionContainer>
                <Style.GeoIcon source={geoPng} />
                <Style.Room>{room}</Style.Room>
                {
                  regular && (
                    <Style.StarIconTouchable onPress={this.onPressSave}>
                      <Style.StarIconImg source={saved ? starIconChecked : starIconNormal} />
                    </Style.StarIconTouchable>
                  )
                }
              </Style.ActionContainer>
            </Style.InnerContainer>)
        }
      </Style.ScheduleItemContainer>
    )
  }
}
