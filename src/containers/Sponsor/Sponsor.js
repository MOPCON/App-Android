import React, { Fragment } from 'react';
import { ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { objectTypeAnnotation } from '@babel/types';

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
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode2')

  state = {
    language: I18n.locale,
    sponsor: [],
  }

  async componentDidMount() {
    const sponsorText = await AsyncStorage.getItem('sponsor');
    const sponsor = JSON.parse(sponsorText).payload;
    this.setState({ sponsor });
  }
  onClickImage = (sponsorId) => () => {
    this.props.navigation.navigate('SponsorDetail', { sponsorId });
  }
  render() {
    const { sponsor, language} = this.state;
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SponsorContainer>
          {Object.keys(TYPE).map(key => (
            <Fragment>
              <Style.TypeText>{TYPE[key]}</Style.TypeText>
              <Style.CardSmallView>
                {
                  sponsor.filter(sponsorData => sponsorData.type === TYPE[key]).map(sponsorData => (
                    <Style.CardSmall onPress={this.onClickImage(sponsorData.id)} key={`sponsor${sponsorData.id}`}>
                      <Style.CardImgSmall>
                        <Style.CardImg source={{ uri: sponsorData.logo }} />
                      </Style.CardImgSmall>
                      <Style.CardText>
                        {language === 'zh' ? sponsorData.name : sponsorData.name_en}
                      </Style.CardText>
                    </Style.CardSmall>
                  ))
                }
              </Style.CardSmallView>
            </Fragment>
          ))}
        </Style.SponsorContainer>
      </ScrollView>
    );
  }
}