import React from 'react';
import { Text } from "react-native";
import PropTypes from 'prop-types';

import I18n from '../../locales';
import iconReward from '../../images/icon/iconReward.png';
import * as Style from './style';

export default class ModalReward extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  }

  render() {
    const { visible, onClose, reward, isComplete } = this.props;
    const lang = I18n.locale;

    return (
      <Style.ModalContainer
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <Style.BodyContainer>
          <Style.InfoContainer>
            <Style.RewardImage source={iconReward} />
            <Style.InfoTitle>{isComplete ? I18n.t('game.awarded_complete_title') : I18n.t('game.awarded')}</Style.InfoTitle>
            { !isComplete && <Style.InfoDesc>{`恭喜獲得${reward}`}</Style.InfoDesc>}
            <Style.InfoDesc>{isComplete ? I18n.t('game.awarded_complete_desc1') :I18n.t('game.awarded_tip_1')}<Text style={{color:"#ffcc00"}}>{isComplete ? I18n.t('game.awarded_complete_desc2') :I18n.t('game.awarded_tip_2')}</Text>{isComplete ? I18n.t('game.awarded_complete_desc3') :I18n.t('game.awarded_tip_3')}</Style.InfoDesc>
            <Style.Touch onPress={onClose}>
              <Style.Btn>
                <Style.BtnText>{I18n.t('common.no_problem')}</Style.BtnText>
              </Style.Btn>
            </Style.Touch>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

