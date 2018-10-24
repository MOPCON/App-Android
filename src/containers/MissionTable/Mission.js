import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import {
  modBorder,
} from '../../theme/index';
import iconLockedImg from '../../images/icon/iconLocked.png';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
`;

const Title = styled.View`
  flex-direction: row;
  width: 30;
`;

const TitleText = styled.Text`
  font-size: 14px;
  color: ${modBorder};
  margin-bottom: 10px;
`;

const Content = styled.Text`
  font-size: 16px;
  color: #fff;
`;

const Icon = styled.Image`
  width: 14px;
  height: 16px;
  margin: 0 10px;
`;

export default class Mission extends Component {
  render() {
    const { isLocked, title, content } = this.props;

    return (
      <Container>
        <Title>
          {isLocked && <Icon source={iconLockedImg} />}
          <TitleText>{title}</TitleText>
        </Title>
        <Content>
          {
            (content.length > 20) ? `${content.slice(0, 20)}...` : content
          }
        </Content>
      </Container>
    );
  }
}