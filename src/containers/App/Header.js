import React, { Component } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../theme';

const Container = styled.View`
  height: ${Platform.OS === 'ios' ? 20 : 0};
  background-color: ${theme.darkBlue};
`;

export default class Header extends Component {
  render() {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.darkBlue}
        />
      </Container>
    );
  }
}
