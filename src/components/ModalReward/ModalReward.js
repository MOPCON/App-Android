import React from 'react';
import PropTypes from 'prop-types';

import iconReward from '../../images/icon/iconReward.png';
import * as Style from './style';

export default class ModalReward extends React.PureComponent {
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
            <Style.RewardImage source={iconReward} />
            <Style.InfoTitle>獲得獎勵</Style.InfoTitle>
            <Style.InfoDesc>{`恭喜獲得 {nnn}!`}</Style.InfoDesc>
            <Style.InfoDesc>您可在我的獎勵中查詢兌換說明</Style.InfoDesc>
            <Style.Touch onPress={onClose}>
              <Style.Btn>
                <Style.BtnText>確定</Style.BtnText>
              </Style.Btn>
            </Style.Touch>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

