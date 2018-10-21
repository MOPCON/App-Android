import React from 'react';
import { ScrollView, AsyncStorage, Image } from 'react-native';
import I18n from '../../locales';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

const TYPE = {
  LEVEL1: 'Tony Stark',
  LEVEL2: 'Bruce Wayne',
  LEVEL3: 'Geek',
  LEVEL4: 'Developer',
  LEVEL5: '特別感謝'
}

export default class Sponsor extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode1')

  state = {
    language: I18n.locale,
    sponsor: [],
  }

  async componentDidMount() {
    const sponsorText = await AsyncStorage.getItem('sponsor');
    const sponsor = JSON.parse(sponsorText).payload;
    this.setState({ sponsor });
    console.log(sponsor);
    console.log(I18n.locale)
  }
  onClickImage = (sponsorId) => () => {
    this.props.navigation.navigate('SponsorDetail', { sponsorId });
  }
  render() {
    const { sponsor } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SponsorContainer>
          <Style.TypeText>TONY STARK</Style.TypeText>
          {
            sponsor.filter(sponsorData => sponsorData.type === TYPE.LEVEL1).map(sponsorData => (
              <Style.CardBig onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                <Style.CardImgBig>
                  <Image
                    style={{ width: 132, height: 132 }}
                    source={{ uri: sponsorData.logo }}
                  />
                </Style.CardImgBig>
              </Style.CardBig>
            ))
          }
          <Style.TypeText>BRUCE WAYNE</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.LEVEL2).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 132, height: 132 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>Geek</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.LEVEL3).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 132, height: 132 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>Developer</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.LEVEL4).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 132, height: 132 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{I18n.t('sponsor.special_thanks')}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.LEVEL5).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 132, height: 132 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
        </Style.SponsorContainer>
      </ScrollView>
    );
  }
}