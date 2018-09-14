import React, { PureComponent } from 'react';
import { Linking } from 'react-native';
import PropTypes from 'prop-types';
import I18n from '../../locales';
import * as Style from './style';
import Button from '../Button/Button';

import starIconNormal from '../../images/buttonStarNormal.png';
import starIconChecked from '../../images/buttonStarChecked.png';
import buttonSlide from '../../images/icon/buttonSlide.png';

export default class SpeakerItem extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    topic: PropTypes.string,
    color: PropTypes.oneOf(['normal', 'inverse']),
    saved: PropTypes.bool,
    slide: PropTypes.string,
    onSave: PropTypes.func,
  }
  static defaultProps = {
    type: '',
    topic: '',
    saved: false,
    color: 'normal'  // normal or inverse
  }
  openSlide = () => {
    const { slide } = this.props;
    Linking.openURL(slide);
  }
  render() {
    const { color, type, topic, saved, onSave } = this.props;
    return (
      <Style.SpeechItemContainer color={color}>
        <Style.Title>{type}</Style.Title>
        <Style.Content>{topic}</Style.Content>
        <Style.FuncView>
          <Button
            text={I18n.t('speech.schedule')}
            margin={[0, 8, 0, 0]}
            iconURI={saved ? starIconChecked : starIconNormal}
            color="inverse"
            onClick={onSave}
          />
          <Button
            text={I18n.t('speech.slide')}
            margin={[0, 0, 0, 0]}
            iconURI={buttonSlide}
            onClick={this.openSlide}
            color="inverse"
          />
        </Style.FuncView>
      </Style.SpeechItemContainer>
    );
  }
}