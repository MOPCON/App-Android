import React from 'react';
import PropTypes from 'prop-types';

import iconWelcome from '../../images/icon/iconWelcome.png';
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
            <Style.WelcomeImage source={iconWelcome} />
            <Style.InfoTitle>歡迎加入</Style.InfoTitle>
            <Style.InfoDesc>歡迎來到Mopcon闖關大進擊，透過達成各關卡任務，將有神祕大獎等著你</Style.InfoDesc>
            <Style.Touch onPress={onClose}>
              <Style.Btn>
                <Style.BtnText>開始遊戲</Style.BtnText>
              </Style.Btn>
            </Style.Touch>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

