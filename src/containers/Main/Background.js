import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  View,
  Image
} from 'react-native';

import bgMainPage from '../../images/bgMainPage.png';

const BgMain = styled.Image`
  flex: 1;
  position: absolute;
  top: 20;
  left: 0;
`;


export default class Background extends Component {
  render() {
    return (
      <View>
        <BgMain
          source={bgMainPage}
        />
      </View>
    );
  }
}
