import React from 'react';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class ModalGameInfo extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  }
  render() {
    const { visible, onClose } = this.props;
    return (
      <Style.ModalContainer
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <Style.BodyContainer>
          <Style.InfoContainer>
            <Style.InfoTitle>搶攻 Mo 幣</Style.InfoTitle>
            <Style.InfoDesc>透過回答問題和攤位互動收集 Mo 幣，累積越多就可以兌換越多扭蛋，裡面藏有各式各樣神秘大獎等著你！</Style.InfoDesc>
            <Style.Touch onPress={onClose}>
              <Style.Btn>
                <Style.BtnText>開始任務</Style.BtnText>
              </Style.Btn>
            </Style.Touch>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

