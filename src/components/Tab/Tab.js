import React, { useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import * as Style from './style';
const Tab = props => {
  const index = props.tabs.findIndex(t => t === props.defaultActiveTab);
  const length = props.tabs.length;
  const screenWidth = Dimensions.get('window').width;
  const [state,setState] = useState({
    tabs: [...props.tabs],
    activeTab: props.defaultActiveTab,
    activeBarPosition: new Animated.Value(index / length),
    tabWidth: 100 / length,
  })

  const onPressTab = (tab) => {
    const index = state.tabs.findIndex(t => t.value === tab.value);
    const length = state.tabs.length;
    Animated.timing(
      state.activeBarPosition,
      {
        toValue: this.compWidth * index / length,
        duration: 200,
      }
    ).start();
    setState({
      ...state,
      activeTab: tab.value,
    });
    props.onChange(tab.value);
  }
  const onLayout = (e) => {
    const index = state.tabs.findIndex(t => t.value === state.activeTab);
    const length = state.tabs.length;
    const compWidth = e.nativeEvent.layout.width;
    const activeBarPosition = compWidth * index / length;
    if (state.activeBarPosition._value !== activeBarPosition) {
      setState({
        ...state, 
        activeBarPosition: new Animated.Value(activeBarPosition) 
      });
    }
  }
  const { tabs, activeTab, activeBarPosition, tabWidth } = state;

  return (
    <Style.TabContainer onLayout={onLayout}>
      {
        tabs.map(tab => (
          <Style.TouchArea
            onPress={() => { onPressTab(tab) }}
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

Tab.propTypes = {
  tabs: PropTypes.array,
  defaultActiveTab: PropTypes.string,
  onChange: PropTypes.func,
}

Tab.defaultProps = {
  tabs: [
    { name: "day1", value: "day1" },
    { name: "day2", value: "day2" },
    { name: "day3", value: "day3" },
  ],
  defaultActiveTab: "day2",
  onChange: () => {},
};

export default Tab;