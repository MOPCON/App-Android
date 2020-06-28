import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

const OutlineButton = props => {
  const { onClick, text, align, margin, iconURI, color, disabled, block } = props;
  return (
    <Style.ButtonTouchable block={block} disabled={disabled} hasIcon={Boolean(iconURI)} onPress={onClick} align={align} margin={margin} color={color}>
      {
        iconURI && <Style.ButtonIcon source={iconURI} />
      }
      <Style.ButtonText color={color}>
        {text}
      </Style.ButtonText>
    </Style.ButtonTouchable>
  );
}

OutlineButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  align: PropTypes.string,
  margin: PropTypes.arrayOf(PropTypes.number),
  iconURI: PropTypes.any,
}

OutlineButton.defaultProps = {
  onClick: () => { },
  text: 'click me',
  align: 'center',
  margin: [16, 0, 16, 0],
  color: 'normal',  // normal or inverse
  disabled: false,
  block: false,
}

export default OutlineButton;