import React, { Component } from 'react';
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
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'home.Community', 'mode1')

  state = {
    tab: 'community'
  }

  handleChange = (tab) => {
    this.setState({
      tab,
    });
  }

  render() {
    const { tab } = this.state;

    return (
      <Style.Container>
        <Style.TabContainer>
          <Tab tabs={tabs} defaultActiveTab={tab} onChange={this.handleChange} />
        </Style.TabContainer>
        {
          tab === 'community'
          ? <CommunityBlock />
          : <VolunteerBlock />
        }
      </Style.Container>
    );
  }
}