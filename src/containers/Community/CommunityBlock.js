import React, { Component } from 'react';
import { View } from 'react-native';
import I18n from '../../locales';
import * as Style from './style';

export default class CommunityBlock extends Component {
  render() {
    const { goCommunityDetail, community, participant, goParticipentDetail } = this.props;

    return (
      <View>
        <Style.CommunitySubTitle>{I18n.t('community.tab_community')}</Style.CommunitySubTitle>
        <Style.BlockContainer>
          {
            community.map(c => (
              <Style.CardSmall key={`community_${c.id}`} onPress={() => goCommunityDetail(c.id)}>
                <Style.CardImgSmall
                  source={{ uri: c.photo }}
                />
                <Style.CardText>{c.name}</Style.CardText>
              </Style.CardSmall>
            ))
          }
        </Style.BlockContainer>
        <Style.CommunitySubTitle>{I18n.t('community.participant')}</Style.CommunitySubTitle>
        <Style.BlockContainer>
          {
            participant.map(c => (
              <Style.CardSmall key={`community_${c.id}`} onPress={() => goParticipentDetail(c.id)}>
                <Style.CardImgSmall
                  source={{ uri: c.photo }}
                />
                <Style.CardText>{c.name}</Style.CardText>
              </Style.CardSmall>
            ))
          }
        </Style.BlockContainer>
      </View>
    )
  };
}