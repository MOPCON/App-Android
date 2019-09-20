import React from 'react';
import PropTypes from 'prop-types';

import I18n from '../../locales';
import iconWelcome from '../../images/icon/iconWelcome.png';
import * as Style from './style';

export default class ModalGameInfo extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  }

  render() {
    const { visible, onClose, intro } = this.props;
    const lang = I18n.locale;

    return (
      <Style.ModalContainer
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <Style.BodyContainer>
          <Style.InfoContainer>
            <Style.WelcomeImage source={iconWelcome} />
            <Style.InfoTitle>{lang === 'zh' ? intro.landing_page_title : intro.landing_page_title_en }</Style.InfoTitle>
            <Style.InfoDesc>{lang === 'zh' ? intro.landing_page_text : intro.landing_page_text_en }</Style.InfoDesc>
            <Style.Touch onPress={onClose}>
              <Style.Btn>
                <Style.BtnText>{I18n.t('game.start')}</Style.BtnText>
              </Style.Btn>
            </Style.Touch>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

