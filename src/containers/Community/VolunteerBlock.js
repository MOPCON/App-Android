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
  2: avatarSession,
  3: avatarFinance,
  4: avatarAdministrative,
  5: avatarSponsor,
  6: avatarInformation,
  7: avatarArt,
  8: avatarPublic,
  9: avatarField,
  10: avatarRecord,
  11: avatarVideo,
};

export default class VolunteerBlock extends Component {
  render() {
    const { goVolunteerDetail, volunteer } = this.props;

    console.log(volunteer)

    const lang = I18n.locale;
    return (
      <Style.BlockContainer>
        {
          volunteer.map(v => (
            <Style.CardSmall key={`community_${v.id}`} onPress={() => goVolunteerDetail(v.id)}>
              <Style.CardImgSmall
                resizeMode="cover"
                style={{ backgroundColor: 'transparent' }}
                source={{uri:v.photo}}
              />
              <Style.CardText>{lang === 'zh' ? v.name : v.name_e}</Style.CardText>
            </Style.CardSmall>
          ))
        }
      </Style.BlockContainer>
    );
  }
}