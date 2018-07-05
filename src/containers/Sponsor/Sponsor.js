import React from 'react';
import { ScrollView } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

export default class Sponsor extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode1')
  onClick = () => {
    this.props.navigation.navigate('SponsorDetail');
  }
  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SponsorContainer>
          <Style.TypeText>TONY STARK</Style.TypeText>
          <Style.CardBig onPress={this.onClick}>
            <Style.CardImgBig />
          </Style.CardBig>
          <Style.TypeText>BRUCE WAYNE</Style.TypeText>
          <Style.CardSmallView>
            <Style.CardSmall onPress={this.onClick}>
              <Style.CardImgSmall />
            </Style.CardSmall>
            <Style.CardSmall onPress={this.onClick}>
              <Style.CardImgSmall />
            </Style.CardSmall>
            <Style.CardSmall onPress={this.onClick}>
              <Style.CardImgSmall />
            </Style.CardSmall>
            <Style.CardSmall onPress={this.onClick}>
              <Style.CardImgSmall />
            </Style.CardSmall>
            <Style.CardSmall onPress={this.onClick}>
              <Style.CardImgSmall />
            </Style.CardSmall>
          </Style.CardSmallView>
        </Style.SponsorContainer>
      </ScrollView>
    );
  }
}