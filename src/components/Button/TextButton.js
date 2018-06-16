import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { scheduleCardTypeColor, buttonBackground } from '../../theme/index';

const ButtonTouchable = styled.TouchableOpacity`
  align-self: ${p => p.align};
  margin-top: ${p => p.margin[0]}px;
  margin-right: ${p => p.margin[1]}px;
  margin-bottom: ${p => p.margin[2]}px;
  margin-left: ${p => p.margin[3]}px;
`;
const ButtonView = styled.View`
  padding: 8px 14px;
  border: 1px solid ${scheduleCardTypeColor};
  border-radius: 4px;
  background-color: ${buttonBackground};
`;
const ButtonText = styled.Text`
  font-family: Roboto-Medium;
  letter-spacing: 1px;
  font-size: 14px;
  color: ${scheduleCardTypeColor};
`;
const Style = {
  ButtonText,
  ButtonTouchable,
  ButtonView,
};

export default class OutlineButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    text: PropTypes.string,
    align: PropTypes.string,
    margin: PropTypes.arrayOf(PropTypes.number),
  }
  static defaultProps = {
    onClick: () => { },
    text: 'click me',
    align: 'center',
    margin: [16, 0, 16, 0]
  }
  render() {
    const { onClick, text, align, margin } = this.props;
    return (
      <Style.ButtonTouchable onPress={onClick} align={align} margin={margin}>
        <Style.ButtonView>
          <Style.ButtonText>
            {text}
          </Style.ButtonText>
        </Style.ButtonView>
      </Style.ButtonTouchable>
    );
  }
}