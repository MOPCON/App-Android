import React from 'react'
import moment from 'dayjs';
import { ScrollView, Linking } from 'react-native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import ScheduleCard from '../../components/ScheduleItem/ScheduleCard';
import I18n from '../../locales';
import * as Style from './style';

const toTime = timestamp => moment(timestamp).format('HH:mm')

const normalizeScheduleData = (originScheduleData) => ({
  ...originScheduleData,
  time: `${toTime(originScheduleData.started_at * 1000)} - ${toTime(originScheduleData.endeded_at * 1000)}`,
  saved: false,
  speaker: originScheduleData.name,
  speaker_e: originScheduleData.name_e,
});

export default class SponsorDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.info', 'mode2')

  state = {
    sponsor: {}
  }

  openLink = (url) => {
    Linking.openURL(url);
  }

  render() {
    const { sponsorDetail } = this.props.navigation.state.params;
    const name = I18n.locale === 'en' ? sponsorDetail.name_e : sponsorDetail.name;
    const info = I18n.locale === 'en' ? sponsorDetail.about_us_e : sponsorDetail.about_us;
    const logo = sponsorDetail.logo_path;

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
          <Style.SplitText>關於廠商</Style.SplitText>
          <Style.SponsorDesc>
            {info}
          </Style.SponsorDesc>
          <Style.SplitText>贊助場次</Style.SplitText>

          {
            sponsorDetail.speaker_information.map(normalizeScheduleData).map(scheduleData => (
              <ScheduleCard key={scheduleData.title_e} scheduleData={scheduleData} />
            ))
          }

          <Style.MoreButton onPress={() => this.openLink(sponsorDetail.understand_more)}>
            <Style.MoreText>{I18n.t('sponsor.more')}</Style.MoreText>
          </Style.MoreButton>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}