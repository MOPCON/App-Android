import React, { Component } from 'react';
import * as Style from './style';

export default class CommunityBlock extends Component {
  render() {
    const { goCommunityDetail, community } = this.props;

    return (
      <Style.BlockContainer>
        {
          community.map(c => (
            <Style.CardSmall key={`community_${c.id}`} onPress={() => goCommunityDetail(c.id)}>
              <Style.CardImgSmall
                source={{ uri: c.logo }}
              />
              <Style.CardText>{c.title}</Style.CardText>
            </Style.CardSmall>
          ))
        }
      </Style.BlockContainer>
    )
  };
}