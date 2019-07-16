import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import * as Style from './style';

export default class Tab extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    defaultActiveTab: PropTypes.string,
    onChange: PropTypes.func,
  }
  static defaultProps = {
    tabs: [
      { name: 'day1', value: 'day1' },
      { name: 'day2', value: 'day2' },
      { name: 'day3', value: 'day3' }
    ],
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
    const index = this.state.tabs.findIndex(t => t.value === tab.value);
    const length = this.state.tabs.length;
    Animated.timing(
      this.state.activeBarPosition,
      {
        toValue: this.compWidth * index / length,
        duration: 200,
      }
    ).start();
    this.setState({
      activeTab: tab.value,
    });
    this.props.onChange(tab.value);
  }
  onLayout = (e) => {
    const index = this.state.tabs.findIndex(t => t.value === this.state.activeTab);
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
      <Style.TabContainer onLayout={this.onLayout}>
        {
          tabs.map(tab => (
            <Style.TouchArea
              onPress={() => { this.onPressTab(tab) }}
              key={`tab_${tab.value}`}
              isActive={tab.value === activeTab}
            >
              <Style.TabText isActive={tab.value === activeTab} >{tab.name}</Style.TabText>
            </Style.TouchArea>
          ))
        }
      </Style.TabContainer>
    )
  }
}