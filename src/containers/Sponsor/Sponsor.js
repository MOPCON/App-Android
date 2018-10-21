import React from 'react';
import { ScrollView, AsyncStorage, Image } from 'react-native';
import I18n from '../../locales';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';

const TYPE = {
  BW: 'Bruce Wayne',
  HACKER: 'Hacker',
  GEEK: 'Geek',
  DEV: 'Developer',
  TUT: '教育贊助',
  TXS: '特別感謝',
  HLP: '協辦單位',
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
          <Style.TypeText>{TYPE.BW}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.BW).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{TYPE.HACKER}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.HACKER).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{TYPE.GEEK}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.GEEK).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{TYPE.DEV}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.DEV).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{TYPE.TUT}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.TUT).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{TYPE.TXS}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.TXS).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: sponsorData.logo }}
                    />
                  </Style.CardImgSmall>
                </Style.CardSmall>
              ))
            }
          </Style.CardSmallView>
          <Style.TypeText>{TYPE.HLP}</Style.TypeText>
          <Style.CardSmallView>
            {
              sponsor.filter(sponsorData => sponsorData.type === TYPE.HLP).map(sponsorData => (
                <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                  <Style.CardImgSmall>
                    <Image
                      style={{ width: 50, height: 50 }}
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