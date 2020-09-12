import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import apiServices from '../../api/services';
import I18n from '../../locales';

import iconChevronRightImg from '../../images/icon/iconChevronRight.png';

const Container = styled.View`
  width: 100%;
  flex-direction: column;
`;

const TitleContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
`;

const Message = styled.Text`
  color: #000000;
  font-size: 16px;
  background-color: #FFCC00;
  padding: 20px;
  border-radius: 6px;
`;

const TouchArea = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const MoreText = styled.Text`
  color: #878787;
  font-size: 16px;
`;

const RightArrow = styled.Image`
  width: 7;
  height: 12;
  margin-left: 8;
`;

const Block = styled.View``;

const News = ({ onChangeTab, news }) => {

  const toNews = () => {
    onChangeTab('NEWS');
  };

  return (
    <Container>
      <TitleContainer>
        <Title>{I18n.t('news.title')}</Title>
        <Block>
          <TouchArea onPress={toNews}>
            <MoreText>{I18n.t('news.more')}</MoreText>
            <RightArrow source={iconChevronRightImg} />
          </TouchArea>
        </Block>
      </TitleContainer>
      <Message>
      {
        Boolean(news.length) ? news[0].title : ''
      }
      </Message>
    </Container>
  );
}

export default News;