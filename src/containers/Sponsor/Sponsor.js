import React, { Fragment } from 'react';
import { ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { objectTypeAnnotation } from '@babel/types';
import apiServices from '../../api/services';

const TYPE = {
  TS: { name: 'Tony Stark', id: 'tony_stark' },
  BW: { name: 'Bruce Wayne', id: 'bruce_wayne' },
  HACKER: { name: 'Hacker', id: 'hacker' },
  GEEK: { name: 'Geek', id: 'geek' },
  DEV: { name: 'Developer', id: 'developer' },
  HLP: { name: '協辦單位', id: 'special_cooperation' },
  TXS: { name: '特別感謝', id: 'special_thanks' },
  TUT: { name: '教育贊助', id: 'education' },
}

export default class Sponsor extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode2')

  state = {
    sponsor: [],
  }

  getSponsors = async () => {
    const { data: sponsor } = await apiServices.get('/sponsor');
    console.log(sponsor);
    this.setState({ sponsor });
  }

  async componentDidMount() {
    // const sponsorText = await AsyncStorage.getItem('sponsor');
    // const sponsor = JSON.parse(sponsorText).payload;
    // this.setState({ sponsor });
    this.getSponsors();
  }
  onClickImage = (sponsorDetail) => () => {
    this.props.navigation.navigate('SponsorDetail', { sponsorDetail });
  }

  render() {
    const { sponsor, language } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SponsorContainer style={{ flexGrow: 1 }}>
          {
            sponsor.map(sponsorData => (
              <Fragment key={sponsorData.name_e}>
                <Style.TypeText>{I18n.locale === 'en' ? sponsorData.name_e : sponsorData.name}</Style.TypeText>
                <Style.CardSmallView>
                    {
                      sponsorData.data.map(sponsorDetail => (
                        <Style.CardSmall onPress={this.onClickImage(sponsorDetail)} key={`sponsor${sponsorDetail.name_e}`}>
                          <Style.CardImgSmall>
                            <Style.CardImg source={{ uri: sponsorDetail.logo_path }} />
                          </Style.CardImgSmall>
                          <Style.CardText>
                            {language === 'en' ? sponsorDetail.name_e : sponsorDetail.name}
                          </Style.CardText>
                        </Style.CardSmall>
                      ))
                    }
                  </Style.CardSmallView>
              </Fragment>
            ))
          }
        </Style.SponsorContainer>
      </ScrollView>
    );
  }
}




/* <Fragment key={TYPE[key].id}>
                  <Style.TypeText>{TYPE[key].name}</Style.TypeText>
                  <Style.CardSmallView>
                    {
                      sponsor[TYPE[key].id].map(sponsorData => (
                        <Style.CardSmall onPress={this.onClickImage(sponsorData)} key={`sponsor${sponsorData.sponsor_en}`}>
                          <Style.CardImgSmall>
                            <Style.CardImg source={{ uri: sponsorData.logo_path }} />
                          </Style.CardImgSmall>
                          <Style.CardText>
                            {language === 'zh' ? sponsorData.sponsor : sponsorData.sponsor_en}
                          </Style.CardText>
                        </Style.CardSmall>
                      ))
                    }
                  </Style.CardSmallView>
                </Fragment> */