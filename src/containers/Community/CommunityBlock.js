import React, { Component } from 'react';
import * as Style from './style';

export default class CommunityBlock extends Component {
  render() {
    return (
      <Style.ScrollView>
        <Style.CardSmallView>
          <Style.CardSmall onPress={this.onClick}>
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
        </Style.CardSmallView>
      </Style.ScrollView>
    )
  };
}