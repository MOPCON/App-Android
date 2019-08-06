import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import geoPng from '../../images/location.png';
import TagBlock from '../TagBlock/TagBlock';


export default class ScheduleItem extends Component {
  static propTypes = {
    paintBG: PropTypes.bool,  // is relax time ?
    title: PropTypes.string,  // speak topic
    category: PropTypes.string,   // topic category string eg. CLOUD
    name: PropTypes.string,   // speaker name
    room: PropTypes.string,   // room location string
    regular: PropTypes.bool,  // regular conference schedule or not
    onPressTitle: PropTypes.func,
  }

  onPressTitle = () => {
    this.props.onPressTitle();
  }

  render() {
    const { paintBG, title, category, name, room, regular } = this.props;
    return (
      <Style.ScheduleItemContainer paintBG={paintBG}>
        {
          paintBG ? <Style.Title paintBG={paintBG}>{title}</Style.Title> : (
            <Style.InnerContainer>
              <Style.TitleTouchable onPress={this.onPressTitle}>
                <Style.Title paintBG={paintBG}>{title}</Style.Title>
              </Style.TitleTouchable>
              <TagBlock />
              <Style.ActionContainer>
                <Style.Name>{name}</Style.Name>
                {
                  room && (
                    <Style.GeoContainer>
                      <Style.GeoIcon source={geoPng} />
                      <Style.Room>{room}</Style.Room>
                    </Style.GeoContainer>
                  )
                }
              </Style.ActionContainer>
            </Style.InnerContainer>)
        }
      </Style.ScheduleItemContainer>
    )
  }
}


// <Style.Category>{category}</Style.Category>
// {
//   regular && (
//     <Style.StarIconTouchable onPress={this.onPressSave}>
//       <Style.StarIconImg source={saved ? starIconChecked : starIconNormal} />
//     </Style.StarIconTouchable>
//   )
// }