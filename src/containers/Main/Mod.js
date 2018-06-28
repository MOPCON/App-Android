import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import I18n from '../../locales';
import * as theme from '../../theme';

const width = (Dimensions.get('window').width - (20 + 20 + 16)) / 2;

const Container = styled.TouchableOpacity`
  width: ${width};
  height: ${width};
  /* border: 1px solid ${theme.scheduleCardTypeColor}; */
  border: 1px solid ${theme.modBorder};
  border-radius: 5px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(2, 208, 203, 0.1);
`;

const InnerView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.Image`
  margin-bottom: 19px;
`;

const Text = styled.Text`
  color: ${theme.scheduleCardTypeColor};
  font-size: 15px;
  font-family: Roboto-Medium;
  letter-spacing: 0.6px;
`;

export default class Mod extends Component {
  render() {
    const { icon, name, navigate } = this.props;

    return (
      <Container onPress={navigate}>
        <InnerView>
          <Image source={icon} />
          <Text>{I18n.t(name)}</Text>
        </InnerView>
      </Container>
    );
  }
}