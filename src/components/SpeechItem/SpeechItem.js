import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';
import Button from '../Button/Button';

import buttonStarNormal from '../../images/icon/buttonStarNormal.png';
import buttonSlide from '../../images/icon/buttonSlide.png';

export default class SpeakerItem extends PureComponent {
  static propTypes = {
    type: PropTypes.string,
    topic: PropTypes.string,
    color: PropTypes.oneOf(['normal', 'inverse'])
  }
  static defaultProps = {
    type: '',
    topic: '',
    color: 'normal'  // normal or inverse
  }
  render() {
    const { color, type, topic } = this.props;
    return (
      <Style.SpeechItemContainer color={color}>
        <Style.Title>{type}</Style.Title>
        <Style.Content>{topic}</Style.Content>
        <Style.FuncView>
          <Button text="加入行程" margin={[0, 8, 0, 0]} iconURI={buttonStarNormal} color="inverse" />
          <Button text="投影片" margin={[0, 0, 0, 0]} iconURI={buttonSlide} color="inverse" />
        </Style.FuncView>
      </Style.SpeechItemContainer>
    );
  }
}