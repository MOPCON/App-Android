import React from 'react';
import styled from 'styled-components/native';

import iconStarNormal from '../../images/icon/buttonStarNormal.png'
import tempImg from '../../images/temp.jpg'
import geoPng from '../../images/location.png';


const Container = styled.View`
  border: 1px solid #00aaf0;
  padding: 16px 0;
  height: 300px;
`;

const HeaderContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Time = styled.Text`
  color: #00aaf0;
  font-size: 20px;
`;

const FavImg = styled.Image``;

const MainImage = styled.Image`
  width: 100%;
  height: 120px;
  margin-bottom: 16px;
`;

const TitleContainer = styled.View`
  padding: 0 20px;
  margin-bottom: 16px;
`;

const TitleText = styled.Text`
  font-size: 18px;
  color: white;
`;

const FooterContainer = styled.View`
  padding: 0 20px;
  flex-direction: row;
`;

const Speaker = styled.Text`
  color: #878787;
  font-size: 18px;
  width: 50%;
`
const LocationContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const LocationIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
const LocationText = styled.Text`
  color: #878787;
  font-size: 18px;
`;

const TopicScheduleItem = () => {
  return(
    <Container>
      <HeaderContainer>
        <Time>10:15 - 11:00</Time>
        <FavImg source={iconStarNormal} />
      </HeaderContainer>
      <MainImage source={tempImg} resizeMode="cover" />
      <TitleContainer>
        <TitleText>這是演講主題 - 聊聊你不知道的兩岸創業及產品運營那些事</TitleText>
      </TitleContainer>
      <FooterContainer>
        <Speaker>田哲禹</Speaker>
        <LocationContainer>
          <LocationIcon source={geoPng} />
          <LocationText>R1:一廳</LocationText>
        </LocationContainer>
      </FooterContainer>
    </Container>
  );
};

export default TopicScheduleItem;
