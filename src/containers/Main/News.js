import React, { Component } from 'react';
import styled from 'styled-components/native';
import * as theme from '../../theme';

const Container = styled.View`
  width: 100%;
  border: 1px solid ${theme.modBorder};
  border-radius: 5px;
  padding-top: 12;
  padding-right: 16;
  padding-bottom: 12;
  padding-left: 16;
  margin-bottom: 16;
`;

const Title = styled.Text`
  color: ${theme.scheduleCardTypeColor};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8;
  letter-spacing: 0.2px;
`;

const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Message = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.3px;
`;

const TouchArea = styled.TouchableOpacity`

`;

const MoreText = styled.Text`
  color: ${theme.scheduleCardTypeColor};
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.3px;
`;

export default class News extends Component {
  render() {
    return (
      <Container>
        <Title>最新消息</Title>
        <Content>
          <Message>任務遊戲倒數20分鐘!</Message>
          <TouchArea>
            <MoreText>More ></MoreText>
          </TouchArea>
        </Content>
      </Container>
    );
  }
}