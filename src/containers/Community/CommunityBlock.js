import React, { Component } from 'react';
import * as Style from './style';

export default class CommunityBlock extends Component {
  render() {
    const { goCommunityDetail } = this.props;

    return (
      <Style.BlockContainer>
        <Style.CardSmall onPress={goCommunityDetail}>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
        <Style.CardSmall>
          <Style.CardImgSmall />
        </Style.CardSmall>
      </Style.BlockContainer>
    )
  };
}