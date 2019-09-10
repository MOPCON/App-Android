import React, { useEffect } from 'react'
import { Image } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

// component
import News from './News';
import LangSelect from '../../components/LangSelect/LangSelect';
import TopicScheduleCarousel from '../../components/TopicScheduleCarousel/TopicScheduleCarousel';
import TopicImageCarousel from '../../components/TopicImageCarousel/TopicImageCarousel';
import * as Style from './style';

// image
import mopconLogo from '../../images/logo.png';

const Main = ({ language, onChangeLanguage, navigation, onChangeTab }) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Style.Container>
      <Style.ScrollContainer>
        <Style.Content>
          <Style.LogoContainer>
            <Image style={{ width: 200, height: 40 }} resizeMode="contain" source={mopconLogo} />
            <LangSelect language={language} onChange={onChangeLanguage} />
          </Style.LogoContainer>
        </Style.Content>
        <TopicImageCarousel />
        <Style.Content>
          <Style.NewsContainer>
            <News onChangeTab={onChangeTab} />
          </Style.NewsContainer>
        </Style.Content>
        <TopicScheduleCarousel navigation={navigation} />
      </Style.ScrollContainer>
    </Style.Container>
  )
};

export default Main;
