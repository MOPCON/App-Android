import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { normalizeScheduleData } from '../../utils/normalizeSchedule';
import I18n from '../../locales';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import ScheduleCard from '../ScheduleItem/ScheduleCard';
import apiServices from '../../api/services';
import gameServices from '../../api/gameServices';
import AsyncStorage from '@react-native-community/async-storage';

const { width } = Dimensions.get('window');

export const CarouselContainer = styled.ScrollView`
  margin-bottom: 16px;
`;

export const CarouselTitle = styled.Text`
  color: white;
  font-size: 16px;
  margin-bottom: 16px;
  padding: 0 20px;
`;

const TopicScheduleCarousel = ({ navigation, originSchedule }) => {
  const [schedule, setSchedule] = useState([]);
  const [savedSchedule, setSavedSchedule] = useState({});

  const getSaved = async () => {
    const savedScheduleText = await AsyncStorage.getItem('savedschedule');
    let s = JSON.parse(savedScheduleText);
    if (!s) { s = {}; }
    setSavedSchedule(s);
    return s;
  }

  const filterSchedule = (originScheduleArr, saved) => {
    const now = (new Date()).getTime();
    const result = [];
    originScheduleArr.forEach((periodData) => {
      periodData.period.forEach((periodDetail) => {
        periodDetail.room.forEach((sessionData) => {
          const dayCondition = sessionData.started_at * 1000 > now;
          if (saved[sessionData.session_id] && dayCondition) {
            result.push(normalizeScheduleData(sessionData, saved));
          }
        })
      })
    })
    return result;
  }

  const init = async () => {
    const s = await getSaved();
    const newSchedule = filterSchedule(originSchedule, s);
    setSchedule(newSchedule);
  }

  const onSave = ({ session_id }) => {
    const s = {
      ...savedSchedule,
    };
    s[session_id] = !s[session_id];
    setSavedSchedule(s);
    AsyncStorage.setItem('savedschedule', JSON.stringify(s));
    gameServices.post('/mySession', {session_id, action: s[session_id] ? 'add' : 'remove'});
    const newSchedule = filterSchedule(originSchedule, s);
    setSchedule(newSchedule);
  }

  const onPressTitle = ({ session_id }) => {
    const savedStatus = savedSchedule[session_id];
    navigation.navigate('ScheduleDetail', { session_id, savedStatus, onSave });
  }

  const renderItem = ({ item }) => {
    return (
      <ScheduleCard
        key={item.session_id}
        scheduleData={item}
        onPressTitle={onPressTitle}
        onSave={onSave}
      />
    );
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Fragment>
      <CarouselTitle>{I18n.t('schedule.hotTopic')}</CarouselTitle>
      <CarouselContainer>
        <Carousel
          inactiveSlideScale={0.94}
          sliderWidth={width}
          itemWidth={width - 40}
          data={schedule}
          renderItem={renderItem}
        />
      </CarouselContainer>
    </React.Fragment>
  );
};

export default TopicScheduleCarousel;
