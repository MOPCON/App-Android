import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Tab from '../../components/Tab/Tab';
import CommunityBlock from './CommunityBlock';
import VolunteerBlock from './VolunteerBlock';

export default class Community extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.title', 'mode2')

  state = {
    tab: 'community',
    community: [],
    volunteer: [],
  }

  async componentDidMount() {
    const communityText = await AsyncStorage.getItem('community');
    const community = JSON.parse(communityText).payload;

    const volunteerText = await AsyncStorage.getItem('volunteer');
    const volunteer = JSON.parse(volunteerText).payload;

    this.setState({ community, volunteer });
  }

  handleChange = (tab) => {
    this.setState({
      tab,
    });
  }

  goCommunityDetail = (id) => {
    this.props.navigation.navigate('CommunityDetail', { id });
  }

  render() {
    const { tab, community, volunteer } = this.state;

    const tabs = [
      { name: I18n.t('community.tab_community'), value: 'community' },
      { name: I18n.t('community.tab_volunteer'), value: 'volunteer' }
    ];

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.TabContainer>
            <Tab tabs={tabs} defaultActiveTab={tab} onChange={this.handleChange} />
          </Style.TabContainer>
          {
            tab === 'community'
              ? <CommunityBlock goCommunityDetail={this.goCommunityDetail} community={community} />
              : <VolunteerBlock volunteer={volunteer} />
          }
        </Style.Container>
      </ScrollView>
    );
  }
}