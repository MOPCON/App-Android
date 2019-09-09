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
  color: #fff;
  font-size: 16px;
  background-color: #0C3449;
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

const News = ({ navigation }) => {

  const [news, setNews] = useState('')

  const toNews = () => {
    navigation.navigate('News');
  };

  const getNews = async () => {
    const { data: news } = await apiServices.get('/news');
    setNews(news[0].title);
  }

  useEffect(() => {
    getNews();
  }, []);

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
      <Message>{news}</Message>
    </Container>
  );
}

export default News;