import React, { Component } from 'react';
import { Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { aquamarineTwo, scheduleCardTypeColor } from '../../theme/index';

const TabContainer = styled.View`
  height: 50px;
  width: 100%;
  margin-bottom: 16px;
  position: relative;
`;

const TabActiveItem = styled(Animated.View)`
  width: ${p => p.tabWidth}%;
  height: 1px;
  position: absolute;
  bottom: 0;
  /* transform: translateX(${p => p.activeBarPosition}px); */
  z-index: 1;
  flex-direction: row;
  justify-content: center;
`;

const TabActiveItemInner = styled.View`
  width: 80px;
  background-color: #00aaf0;
  height: 1px;
`;

const TextContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: row;
`;

const TouchArea = styled.TouchableOpacity`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 0.6px;
`;

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
      <TabContainer onLayout={this.onLayout}>
        <TabActiveItem tabWidth={tabWidth} style={{ transform: [{ translateX: activeBarPosition }] }} >
          <TabActiveItemInner />
        </TabActiveItem>
        <TextContainer>
          {
            tabs.map(tab => (
              <TouchArea onPress={() => { this.onPressTab(tab) }} key={`tab_${tab.value}`}>
                <TabText isActive={tab.value === activeTab} >{tab.name}</TabText>
              </TouchArea>
            ))
          }
        </TextContainer>
      </TabContainer>
    )
  }
}