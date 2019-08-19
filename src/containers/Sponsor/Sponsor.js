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
    language: I18n.locale,
    sponsor: { tony_stark: [], bruce_wayne: [], hacker: [], geek: [], developer: [], special_cooperation: [], special_thanks: [] },
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
          {Object.keys(TYPE).map(key => (
            Array.isArray(sponsor[TYPE[key].id]) && Boolean(sponsor[TYPE[key].id].length)
              ? (
                <Fragment key={TYPE[key].id}>
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
                </Fragment>
              )
              : null
          ))}
        </Style.SponsorContainer>
      </ScrollView>
    );
  }
}