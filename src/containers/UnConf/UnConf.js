import React from 'react';
import styled from 'styled-components/native';
import { darkBlue } from '../../theme/index';

import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import Tab from '../../components/Tab/Tab';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

const UnConfContainer = styled.View`
  background-color: ${darkBlue};
  padding: 16px;
`;

const UnConfScrollView = styled.ScrollView``;

const Style = {
  UnConfContainer, UnConfScrollView
};

const tabs = [
  { name: 'day1', value: 'day1' },
  { name: 'day2', value: 'day2' }
];
const defaultActiveTab = 'day1';

export default class UnConf extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'unConf.title', 'mode1')

  render() {
    return (
      <UnConfScrollView>
        <UnConfContainer>
          <Tab tabs={tabs} defaultActiveTab={defaultActiveTab} />
          <ScheduleHeader time="08:00 ~ 09:00" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleHeader time="08:00 ~ 09:00" />
          <ScheduleItem
            paintBG
            title="下午茶" />
          <ScheduleHeader time="08:00 ~ 09:00" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            name="田哲禹"
            room="R1 : 一廳" />
          <ScheduleItem
            title="Innovate width New Technologies on Google Cloud"
            name="田哲禹"
            room="R1 : 一廳" />
          <Button text="查看議程" align="center" margin={[16, 0, 0, 0]} />
        </UnConfContainer>
      </UnConfScrollView>
    );
  }
}