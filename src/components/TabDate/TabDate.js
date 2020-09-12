import React, { useState } from 'react';
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
  background-color: #FFCC00;
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

const TabDate = props => {
  const index = props.tabs.findIndex((t) => t === props.defaultActiveTab);
  const length = props.tabs.length;
  const screenWidth = Dimensions.get("window").width;
  const [state, setState] = useState({
      tabs: [...props.tabs],
      activeTab: props.defaultActiveTab,
      activeBarPosition: new Animated.Value(index / length),
      tabWidth: 100 / length,
  });
  const onPressTab = (tab) => {
    const index = state.tabs.findIndex(t => t.value === tab.value);
    const length = state.tabs.length;
    Animated.timing(
      state.activeBarPosition,
      {
        toValue: compWidth * index / length,
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
    <TabContainer onLayout={onLayout}>
      <TabActiveItem tabWidth={tabWidth} style={{ transform: [{ translateX: activeBarPosition }] }} >
        <TabActiveItemInner />
      </TabActiveItem>
      <TextContainer>
        {
          tabs.map(tab => (
            <TouchArea key={tab.value} onPress={() => { onPressTab(tab) }} key={`tab_${tab.value}`}>
              <TabText isActive={tab.value === activeTab} >{tab.name}</TabText>
            </TouchArea>
          ))
        }
      </TextContainer>
    </TabContainer>
  )
}

TabDate.propTypes = {
  tabs: PropTypes.array,
  defaultActiveTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
}
TabDate.defaultProps = {
  tabs: [
    { name: 'day1', value: 'day1' },
    { name: 'day2', value: 'day2' },
    { name: 'day3', value: 'day3' }
  ],
  defaultActiveTab: 'day2',
  onChange: () => { },
}

export default TabDate;