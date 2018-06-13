import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabContainer, TabActiveItem, TouchArea, TextContainer, TabText } from './style';


export default class ScheduleTab extends Component {
  static propTypes = {
  }
  state = {
    isFirstDay: true,
  }
  onPressA = () => {
    this.setState({
      isFirstDay: true,
    });
  }
  onPressB = () => {
    this.setState({
      isFirstDay: false,
    });
  }
  render() {
    const { isFirstDay } = this.state;
    return (
      <TabContainer>
        <TabActiveItem isFirstDay={isFirstDay} />
        <TextContainer>
          <TouchArea onPress={this.onPressA}>
            <TabText isFirstDay={isFirstDay} >11/3</TabText>
          </TouchArea>
          <TouchArea onPress={this.onPressB}>
            <TabText isFirstDay={!isFirstDay}>11/4</TabText>
          </TouchArea>
        </TextContainer>
      </TabContainer>
    )
  }
}