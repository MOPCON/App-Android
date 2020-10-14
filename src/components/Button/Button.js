import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  align: PropTypes.string,
  margin: PropTypes.arrayOf(PropTypes.number),
  iconURI: PropTypes.any,
}

const defaultProps = {
  onClick: () => { },
  text: 'click me',
  align: 'center',
  margin: [16, 0, 16, 0],
  color: 'normal',  // normal or inverse
  disabled: false,
  block: false,
}

const _FilledButton = props => {
  const { onClick, text, align, margin, iconURI, color, disabled, block } = props;
  return (
    <Style.FilledButtonTouchable block={block} disabled={disabled} hasIcon={Boolean(iconURI)} onPress={onClick} align={align} margin={margin} color={color}>
      {
        iconURI && <Style.ButtonIcon source={iconURI} />
      }
      <Style.FilledButtonText color={color}>
        {text}
      </Style.FilledButtonText>
    </Style.FilledButtonTouchable>
  );
}

const OutlineButton = props => {
  const { onClick, text, align, margin, iconURI, color, disabled, block } = props;
  return (
    <Style.OutlineButtonTouchable block={block} disabled={disabled} hasIcon={Boolean(iconURI)} onPress={onClick} align={align} margin={margin} color={color}>
      {
        iconURI && <Style.ButtonIcon source={iconURI} />
      }
      <Style.OutlineButtonText color={color}>
        {text}
      </Style.OutlineButtonText>
    </Style.OutlineButtonTouchable>
  );
}

_FilledButton.propTypes = propTypes;
_FilledButton.defaultProps = defaultProps;
export const FilledButton = _FilledButton;

OutlineButton.propTypes = propTypes;
OutlineButton.defaultProps = defaultProps;
export default OutlineButton;
