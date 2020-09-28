import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';

// component
import News from './News';
import apiServices from '../../api/services';
import LangSelect from '../../components/LangSelect/LangSelect';
import TopicScheduleCarousel from '../../components/TopicScheduleCarousel/TopicScheduleCarousel';
import TopicImageCarousel from '../../components/TopicImageCarousel/TopicImageCarousel';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import * as Style from './style';

// image
import mopconLogo from '../../images/logo.png';

const Main = ({ language, onChangeLanguage, navigation, onChangeTab }) => {

  const [ banner, setBanner ] = useState([]);
  const [ news, setNews ] = useState([]);
  const [ originSchedule, setSession ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);

  const init = async () => {
    const { data } = await apiServices.get('/home');
    const { data: sessionData } = await apiServices.get('/session');
    setBanner(data.banner);
    setNews(data.news);
    setSession(sessionData);
    setIsLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <Style.Container>
      {
        isLoading
          ? (<LoadingIcon size="large" color="#ffffff" />)
          : (
            <Style.ScrollContainer>
              <Style.Content>
                <Style.LogoContainer>
                  <Image style={{ width: 200, height: 40 }} resizeMode="contain" source={mopconLogo} />
                  {/* <LangSelect language={language} onChange={onChangeLanguage} /> */}
                </Style.LogoContainer>
              </Style.Content>
              <TopicImageCarousel banner={banner} />
              <Style.Content>
                <Style.NewsContainer>
                  <News onChangeTab={onChangeTab} news={news} />
                </Style.NewsContainer>
              </Style.Content>
              <TopicScheduleCarousel onChangeTab={onChangeTab} navigation={navigation} originSchedule={originSchedule} />
            </Style.ScrollContainer>
          )
      }
    </Style.Container>
  )
};

export default Main;
