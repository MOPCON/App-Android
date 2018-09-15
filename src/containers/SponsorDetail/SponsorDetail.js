import React from 'react'
import { ScrollView, AsyncStorage } from 'react-native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import I18n from '../../locales';
import * as Style from './style';

export default class SponsorDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode2')

  state = {
    sponsor: {}
  }

  async componentDidMount() {
    const { sponsorId } = this.props.navigation.state.params;
    const sponsorText = await AsyncStorage.getItem('sponsor');
    const sponsor = JSON.parse(sponsorText).payload.find(s => s.id === sponsorId);

    this.setState({ sponsor });
  }

  render() {
    const { sponsor } = this.state;
    const name = I18n.locale === 'en' ? sponsor.name_en : sponsor.name;
    const info = I18n.locale === 'en' ? sponsor.info_en : sponsor.info;
    const logo = sponsor.logo;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.CardView>
            <Style.CardImg
              source={{ uri: logo }}
            />
          </Style.CardView>
          <Style.SponsorName>
            {name}
          </Style.SponsorName>
          <Style.SponsorDesc>
            {info}
          </Style.SponsorDesc>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}