import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class OutlineButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    align: PropTypes.string,
    margin: PropTypes.arrayOf(PropTypes.number),
    iconURI: PropTypes.any,
  }
  static defaultProps = {
    onClick: () => { },
    text: 'click me',
    align: 'center',
    margin: [16, 0, 16, 0],
    color: 'normal',  // normal or inverse
  }
  render() {
    const { onClick, text, align, margin, iconURI, color } = this.props;
    return (
      <Style.ButtonTouchable hasIcon={Boolean(iconURI)} onPress={onClick} align={align} margin={margin} color={color}>
        {
          iconURI && <Style.ButtonIcon source={iconURI} />
        }
        <Style.ButtonText>
          {text}
        </Style.ButtonText>
      </Style.ButtonTouchable>
    );
  }
}