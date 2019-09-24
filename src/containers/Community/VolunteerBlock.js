import React, { Component } from 'react';
import I18n from '../../locales';
import * as Style from './style';

import avatarAgenda from '../../images/avatar/avatarAgenda.png';
import avatarAdministrative from '../../images/avatar/avatarAdministrative.png';
import avatarSession from '../../images/avatar/avatarSession.png';
import avatarFinance from '../../images/avatar/avatarFinance.png';
import avatarSponsor from '../../images/avatar/avatarSponsor.png';
import avatarPublic from '../../images/avatar/avatarPublic.png';
import avatarInformation from '../../images/avatar/avatarInformation.png';
import avatarArt from '../../images/avatar/avatarArt.png';
import avatarRecord from '../../images/avatar/avatarRecord.png';
import avatarVideo from '../../images/avatar/avatarVideo.png';
import avatarField from '../../images/avatar/avatarField.png';

export const AVATAR = {
  1: avatarAgenda,
  2: avatarAdministrative,
  3: avatarSession,
  4: avatarFinance,
  5: avatarSponsor,
  6: avatarPublic,
  7: avatarInformation,
  8: avatarArt,
  9: avatarRecord,
  10: avatarVideo,
  11: avatarField,
};

export default class VolunteerBlock extends Component {
  render() {
    const { goVolunteerDetail, volunteer } = this.props;
    const lang = I18n.locale;
    return (
      <Style.BlockContainer>
        {
          volunteer.map(v => (
            <Style.CardSmall key={`community_${v.id}`} onPress={() => goVolunteerDetail(v.id)}>
              <Style.CardImgSmall
                style={{ backgroundColor: 'transparent' }}
                source={AVATAR[v.id]}
              />
              <Style.CardText>{lang === 'zh' ? v.name : v.name_e}</Style.CardText>
            </Style.CardSmall>
          ))
        }
      </Style.BlockContainer>
    );
  }
}