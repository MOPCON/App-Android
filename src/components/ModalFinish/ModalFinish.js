import React from 'react';
import PropTypes from 'prop-types';

import iconFinish from '../../images/icon/iconFinish.png';
import * as Style from './style';

export default class ModalFinish extends React.PureComponent {
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
            <Style.FinishImage source={iconFinish} />
            <Style.InfoTitle>任務成功</Style.InfoTitle>
            <Style.InfoDesc>恭喜你完成此任務，讓Mopcon更加成長茁壯一大步！</Style.InfoDesc>
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

