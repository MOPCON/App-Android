import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { TabContainer, TabActiveItem, TouchArea, TextContainer, TabText } from './style';

export default class ScheduleTab extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string),
    defaultActiveTab: PropTypes.string,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    tabs: ['day1', 'day2', 'day3'],
    defaultActiveTab: 'day2',
    onChange: () => { },
  }
  constructor(props) {
    super(props);
    const index = props.tabs.findIndex(t => t === props.defaultActiveTab);
    const length = props.tabs.length;
    this.screenWidth = Dimensions.get('window').width;
    this.state = {
      tabs: [...props.tabs],
      activeTab: props.defaultActiveTab,
      activeBarPosition: new Animated.Value(index / length),
      tabWidth: 100 / length,
    }
  }
  onPressTab = (tab) => {
    const index = this.state.tabs.findIndex(t => t === tab);
    const length = this.state.tabs.length;
    Animated.timing(
      this.state.activeBarPosition,
      {
        toValue: this.compWidth * index / length,
        duration: 200,
      }
    ).start();
    this.setState({
      activeTab: tab,
    });
    this.props.onChange(tab);
  }
  onLayout = (e) => {
    const index = this.state.tabs.findIndex(t => t === this.state.activeTab);
    const length = this.state.tabs.length;
    this.compWidth = e.nativeEvent.layout.width;
    const activeBarPosition = this.compWidth * index / length;
    if (this.state.activeBarPosition._value !== activeBarPosition) {
      this.setState({ activeBarPosition: new Animated.Value(activeBarPosition) });
    }
  }
  render() {
    const { tabs, activeTab, activeBarPosition, tabWidth } = this.state;
    return (
      <TabContainer onLayout={this.onLayout}>
        <TabActiveItem tabWidth={tabWidth} style={{ transform: [{ translateX: activeBarPosition }] }} />
        <TextContainer>
          {
            tabs.map(tab => (
              <TouchArea onPress={() => { this.onPressTab(tab) }} key={`tab_${tab}`}>
                <TabText isActive={tab === activeTab} >{tab}</TabText>
              </TouchArea>
            ))
          }
        </TextContainer>
      </TabContainer>
    )
  }
}