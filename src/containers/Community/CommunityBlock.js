import React, { Component } from 'react';
import * as Style from './style';

export default class CommunityBlock extends Component {
  render() {
    const { goCommunityDetail, community } = this.props;

    return (
      <Style.BlockContainer>
        {
          community.map(c => (
            <Style.CardSmall key={`community_${c.title}`} onPress={() => goCommunityDetail(c.title)}>
              <Style.CardImgSmall />
            </Style.CardSmall>
          ))
        }
      </Style.BlockContainer>
    )
  };
}