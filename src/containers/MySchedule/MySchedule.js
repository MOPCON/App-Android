import React, {Component} from 'react'
import {ScrollView, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import * as Style from './style';
import ScheduleHeader from '../../components/ScheduleItem/ScheduleHeader';
import ScheduleItem from '../../components/ScheduleItem/ScheduleItem';
import NoScheduleItem from '../../components/ScheduleItem/NoScheduleItem';
import Tab from '../../components/Tab/Tab';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import {useNavigation} from "@react-navigation/native";

const MySchedule = ({navigation}) => {
    const [savedSchedule, setSavedSchedule] = React.useState({})

    const [state, setState] = React.useState({
        schedule: [],
        nowScheduleDate: '',
    })

    React.useEffect(() => {
        async function fetchSavedSchedule() {
            const savedScheduleText = await AsyncStorage.getItem('savedschedule');
            let savedSchedule = JSON.parse(savedScheduleText);
            if (!savedSchedule) {
                savedSchedule = {};
            }
            setSavedSchedule(savedSchedule);
        }

        fetchSavedSchedule();
    }, []);

    React.useEffect(() => {
        async function fetchSchedule() {
            const scheduleText = await AsyncStorage.getItem('schedule');
            const schedule = JSON.parse(scheduleText).payload.agenda;

            setState({
                ...state,
                schedule,
                nowScheduleDate: schedule[0].date,
            });
        }

        fetchSchedule();
    }, []);

    const goToSchedule = () => {
        navigation.goBack();
        setTimeout(() => {
            navigation.navigate('Schedule', {nowScheduleDate: state.nowScheduleDate});
        }, 0)
    }

    const onChangeTab = (date) => {
        setState({nowScheduleDate: date});
    }

    const onPressTitle = (agenda) => () => {
        navigation.navigate('ScheduleDetail', {agenda});
    }

    const onSave = (schedule_id) => () => {
        const _savedSchedule = {
            ...savedSchedule,
        };
        _savedSchedule[schedule_id] = !_savedSchedule[schedule_id];
        setSavedSchedule(_savedSchedule);
        AsyncStorage.setItem('savedschedule', JSON.stringify(_savedSchedule));
    }

    const _renderSchedule = (agendas) => {
        const lang = I18n.locale;
        if (agendas.length === 1 && agendas[0].schedule_id === null) {
            const agenda = agendas[0];
            return (
                <ScheduleItem
                    key={`agenda${agenda.duration}`}
                    regular
                    paintBG
                    title={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
                    category={agenda.category}
                    onPressTitle={onPressTitle(agenda)}
                    name={lang === 'zh' ? agenda.name : agenda.name_en}
                    onSave={() => {
                    }}
                />
            )
        }
        const newAgendas = agendas.filter(agenda => savedSchedule[agenda.schedule_id]);
        return newAgendas.length
            ? (newAgendas.map(agenda => (
                <ScheduleItem
                    key={`agenda${agenda.schedule_id}`}
                    regular
                    title={lang === 'zh' ? agenda.schedule_topic : agenda.schedule_topic_en}
                    category={agenda.category}
                    onPressTitle={onPressTitle(agenda)}
                    name={lang === 'zh' ? agenda.name : agenda.name_en}
                    onSave={onSave(agenda.schedule_id)}
                    saved={savedSchedule[agenda.schedule_id]}
                    room={agenda.location}/>
            )))
            : <NoScheduleItem onClick={goToSchedule}/>;
    }

    const {schedule, nowScheduleDate} = state;
    const tabs = schedule.map(scheduleData => ({name: scheduleData.date, value: scheduleData.date}));
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Style.ScheduleContainer>
                {
                    tabs.length ?
                        <Tab tabs={tabs} defaultActiveTab={nowScheduleDate} onChange={onChangeTab}/> :
                        <View/>
                }

                {
                    schedule.map((scheduleData, scheduleIndex) => (
                        <Style.AgendaView
                            key={`schedule${scheduleData.date}`}
                            active={nowScheduleDate === scheduleData.date}>
                            {scheduleData.items.map((itemData, itemIndex) => (
                                <View key={`item${scheduleData.date},${itemData.duration}`}>
                                    <ScheduleHeader time={itemData.duration}/>
                                    {
                                        _renderSchedule(itemData.agendas)
                                    }
                                </View>
                            ))}
                        </Style.AgendaView>
                    ))
                }
            </Style.ScheduleContainer>
        </ScrollView>
    )
}

MySchedule.navigationOptions = ({navigation}) => NavigationOptions(navigation, 'home.MySchedule', 'mode1')
export default function (props) {
    const navigation = useNavigation();
    return <MySchedule {...props} navigation={navigation}/>
}
