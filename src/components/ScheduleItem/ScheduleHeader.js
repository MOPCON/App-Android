import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import starIconNormal from '../../images/buttonStarNormal.png';
import starIconChecked from '../../images/buttonStarChecked.png';

export default class ScheduleHeader extends Component {
  static propTypes = {
    time: PropTypes.string,
    onSave: PropTypes.func,
    saved: PropTypes.bool,
  }
  
  onPressSave = () => {
    this.props.onSave();
  }

  render() {
    const { time, onSave, saved } = this.props;
    return (
      <Style.Header>
        <Style.HeaderText>{time}</Style.HeaderText>
        {
          onSave && (
            <Style.StarIconTouchable onPress={this.onPressSave}>
              <Style.StarIconImg source={saved ? starIconChecked : starIconNormal} />
            </Style.StarIconTouchable>
          )
        }
      </Style.Header>
    )
  }
}
