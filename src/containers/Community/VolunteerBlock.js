import React, { Component } from 'react';
import I18n from '../../locales';
import * as Style from './style';

export default class VolunteerBlock extends Component {
  render() {
    const { volunteer } = this.props;

    return (
      <Style.BlockContainer>
        {
          volunteer.map((v,i) => (
            <Style.Card key={`volunteer_${v.id}`}>
              <Style.CardTitle>
                {(I18n.locale === 'en' ? v.groupname_en : v.groupname)}
              </Style.CardTitle>
              <Style.CardContent>
                {(I18n.locale === 'en' ? v.info_en : v.info)}
                </Style.CardContent>
              <Style.MemberTitle>
                {I18n.t('volunteer.member_title')}
              </Style.MemberTitle>
              <Style.MemberContent>
                {v.memberlist}
              </Style.MemberContent>
            </Style.Card>
          ))
        }
      </Style.BlockContainer>
    );
  }
}