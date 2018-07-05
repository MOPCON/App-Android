import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Tab from '../../components/Tab/Tab';
import CommunityBlock from './CommunityBlock';
import VolunteerBlock from './VolunteerBlock';

const tabs = [
  { name: I18n.t('community.tab_community'), value: 'community' },
  { name: I18n.t('community.tab_volunteer'), value: 'volunteer' }
];

export default class Community extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'community.title', 'mode1')

  state = {
    tab: 'community'
  }

  handleChange = (tab) => {
    this.setState({
      tab,
    });
  }

  goCommunityDetail = () => {
    this.props.navigation.navigate('CommunityDetail');
  }

  render() {
    const { tab } = this.state;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.Container>
          <Style.TabContainer>
            <Tab tabs={tabs} defaultActiveTab={tab} onChange={this.handleChange} />
          </Style.TabContainer>
          {
            tab === 'community'
              ? <CommunityBlock goCommunityDetail={this.goCommunityDetail} />
              : <VolunteerBlock />
          }
        </Style.Container>
      </ScrollView>
    );
  }
}