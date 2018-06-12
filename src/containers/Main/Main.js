import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  Image
} from 'react-native';
import styled from 'styled-components/native';
import * as theme from '../../theme';
import Background from './Background';
import mopconLogo from '../../images/mopconLogo01.png';

const Container = styled.View`
  flex: 1;
  background-color: ${theme.darkBlue};
`;

const Content = styled.ScrollView.attrs({
  contentContainerStyle: props => {
    return {
      marginTop: 62,
      flex: 1,
      alignItems: 'center',
    }
  }
})``;

const LogoContainer = styled.View`
  margin-bottom: 25;
`;

export default class Main extends Component {
  render() {
    return (
      <Container>
        <Background />
        <Content>
          <LogoContainer>
            <Image source={mopconLogo}/>
          </LogoContainer>
          <Text>carousel</Text>
        </Content>
      </Container>
    )
  }
}
