import React from 'react';
import PropTypes from 'prop-types';

import I18n from '../../locales';
import iconReward from '../../images/icon/iconReward.png';
import * as Style from './style';
import { thisTypeAnnotation } from '@babel/types';

export default class ModalReward extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  }

  render() {
    const { visible, onClose, reward } = this.props;
    const lang = I18n.locale;

    return (
      <Style.ModalContainer
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <Style.BodyContainer>
          <Style.InfoContainer>
            <Style.RewardImage source={iconReward} />
            <Style.InfoTitle>{I18n.t('game.awarded')}</Style.InfoTitle>
            <Style.InfoDesc>{`恭喜獲得 {${lang === 'zh' ? reward.name : reward.name_e}}!`}</Style.InfoDesc>
            <Style.InfoDesc>{I18n.t('game.awarded_tip')}</Style.InfoDesc>
            <Style.Touch onPress={onClose}>
              <Style.Btn>
                <Style.BtnText>{I18n.t('common.ok')}</Style.BtnText>
              </Style.Btn>
            </Style.Touch>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

