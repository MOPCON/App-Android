import React from 'react';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

export default class Sponsor extends React.Component{
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode1')
  render(){
    return(
      <Style.SponsorScrollView>
        <Style.SponsorContainer>
          <Style.TypeText>TONY STARK</Style.TypeText>
          <Style.CardBig>
            <Style.CardImgBig />
          </Style.CardBig>
          <Style.TypeText>BRUCE WAYNE</Style.TypeText>
          <Style.CardSmallView>
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
        </Style.SponsorContainer>
      </Style.SponsorScrollView>
    );
  }
}