import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { Consumer, GlobalContext } from '../../store';
import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import ModalReward from '../../components/ModalReward/ModalReward';
import ModalGameInfoComplete from '../../components/ModalGameInfoComplete/ModalGameInfoComplete';
import Button from '../../components/Button/Button';
import GameBlock from './GameBlock';
import gameServices from '../../api/gameServices';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';


import inActiveIcon from '../../images/iconGiftActive.png';
import activeIcon from '../../images/iconGiftActive.png';

const Game = ({ navigation }) => {
  const context = React.useContext(GlobalContext);
  console.log(context)

  const [state, setState] = React.useState({
    modalWelcomeVisible: false,
    modalRewardVisible: false,
    intro: {},
    reward: {},
    isLoading: true,
    missions: [],
    passed: 0,
    progressLeft: 0,
    progressRight: 0,
    getRewardName : '',
    rewardInfo: '',
    isClicked: false,
    openCompleteModal:false,
  }
  )

  const fetchGift = async () => {
    const reward = await gameServices.get('/getReward');
    AsyncStorage.setItem('hasReward', JSON.stringify(true));

    setState({ ...state, rewardInfo: reward.data });

    console.log(reward.data)
  } 

  const fetchTaskData = async () => {
    const { loadGameList } = context.gameStore;
    const data = await gameServices.get('/getTask');

    loadGameList()

    const puzzleList = [];
    data.data.missions.map((item, index) => {
      puzzleList.push({
        id: item.uid,
        title: item.name,
        img: hashImgUrl(item.order, item.passed),
        passed: item.passed
      })
    })

    progressHandler(data.data.passed)

    setState(state => ({
      ...state,
      missions: puzzleList,
      passed: data.data.passed,
    }));
  }

  React.useEffect(() => {
    const firstPlayInitial = async () => {
      if (!context.gameStore) console.error(context)

      const [
        hasPlayed,
        { data: intro },
        task
      ] = await Promise.all([
        AsyncStorage.getItem('hasPlayed'),
        gameServices.get('/intro'),
        
      ]);

    
      // 第一次進入遊戲才會出現
      setState({
        ...state,
        modalWelcomeVisible: hasPlayed !== 'true',
        intro,
        isLoading: false,
      });
    }
    firstPlayInitial();
    fetchTaskData();

  }, [])

  React.useEffect(()=>{
    if(state.rewardInfo.length !== 0){
      setState({ ...state, modalRewardVisible: true, reward });
    }
  },[state.rewardInfo])

  React.useEffect(()=>{
    if((state.passed === 6 || state.passed === 12)){
      fetchGift();
    }
  },[state.passed])

  useFocusEffect(
    React.useCallback(() => {
      fetchTaskData();
    }, [])
  );

  
  
  const onCloseModalWelcome = () => {
    setState({ ...state, modalWelcomeVisible: false });
  }

  const onOpenModalReward = (reward) => {
    setState({ ...state, modalRewardVisible: true, reward });
  }

  const onCloseModalReward = () => {
    const { loadGameList } = context.gameStore;
    loadGameList();
    setState({ ...state, modalRewardVisible: false, openCompleteModal:true });
  }

  const goReward = () => {
    navigation.navigate('Reward');
  }

  const hashImgUrl = (order, isPassed) => {
    if (!isPassed) {
      switch (order) {
        case 1:
          return require('../../images/puzzle/locked/Puzzle1Lock.jpg');
        case 2:
          return require('../../images/puzzle/locked/Puzzle2Lock.jpg');
        case 3:
          return require('../../images/puzzle/locked/Puzzle3Lock.jpg');
        case 4:
          return require('../../images/puzzle/locked/Puzzle4Lock.jpg');
        case 5:
          return require('../../images/puzzle/locked/Puzzle5Lock.jpg');
        case 6:
          return require('../../images/puzzle/locked/Puzzle6Lock.jpg');
        case 7:
          return require('../../images/puzzle/locked/Puzzle7Lock.jpg');
        case 8:
          return require('../../images/puzzle/locked/Puzzle8Lock.jpg');
        case 9:
          return require('../../images/puzzle/locked/Puzzle9Lock.jpg');
        case 10:
          return require('../../images/puzzle/locked/Puzzle10Lock.jpg');
        case 11:
          return require('../../images/puzzle/locked/Puzzle11Lock.jpg');
        case 12:
          return require('../../images/puzzle/locked/Puzzle12Lock.jpg');
      }
    } else {
      switch (order) {
        case 1:
          return require('../../images/puzzle/unlocked/Puzzle1Lock.jpg');
        case 2:
          return require('../../images/puzzle/unlocked/Puzzle2Lock.jpg');
        case 3:
          return require('../../images/puzzle/unlocked/Puzzle3Lock.jpg');
        case 4:
          return require('../../images/puzzle/unlocked/Puzzle4Lock.jpg');
        case 5:
          return require('../../images/puzzle/unlocked/Puzzle5Lock.jpg');
        case 6:
          return require('../../images/puzzle/unlocked/Puzzle6Lock.jpg');
        case 7:
          return require('../../images/puzzle/unlocked/Puzzle7Lock.jpg');
        case 8:
          return require('../../images/puzzle/unlocked/Puzzle8Lock.jpg');
        case 9:
          return require('../../images/puzzle/unlocked/Puzzle9Lock.jpg');
        case 10:
          return require('../../images/puzzle/unlocked/Puzzle10Lock.jpg');
        case 11:
          return require('../../images/puzzle/unlocked/Puzzle11Lock.jpg');
        case 12:
          return require('../../images/puzzle/unlocked/Puzzle12Lock.jpg');
      }
    }

  }

  const progressHandler = passed => {
    if (passed > 6) {
      setState(state => ({
        ...state,
        progressLeft: 100,
        progressRight: ((passed - 6) / 6) * 100
      }))
    } else {
      setState(state => ({
        ...state,
        progressLeft: (passed / 6) * 100,
        progressRight: 0
      }))
    }
  }

  const { modalWelcomeVisible, modalRewardVisible, intro, reward, isLoading, missions, progressLeft, progressRight, passed } = state;

  // const { score, missionList, isLoaded, lastPassIndex } = context.gameStore;

  return (
    <>
    <Style.ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
      <Style.GameContainer>
        {
          isLoading
            ? (
              <LoadingIcon size="large" color="#ffffff" />
            )
            : (
              <View>
                {/** 上方頭像、分數 */}
                <Style.ProfileContainer>
                  <Style.UserIcon source={avatarUser} />
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Style.TotalText>{I18n.t('game.total_score')}</Style.TotalText>
                    <Style.ScoreText>{passed}/12</Style.ScoreText>
                  </View>
                  {/** 進度條 */}
                  <Style.ProgressContainer>
                    <Style.ProgressBar>
                      <View style={{ width: `${progressLeft}%`, height: 4, backgroundColor: '#ffcc00' }}></View>
                      <View style={{ width: `${100 - progressLeft}%`, height: 4, backgroundColor: '#fff' }}></View>
                    </Style.ProgressBar>
                    <View style={{ width: '10%' }}>
                      <Style.ProgressGift source={inActiveIcon} />
                    </View>
                    <Style.ProgressBar>
                      <View style={{ width: `${progressRight}%`, height: 4, backgroundColor: '#ffcc00' }}></View>
                      <View style={{ width: `${100 - progressRight}%`, height: 4, backgroundColor: '#fff' }}></View>
                    </Style.ProgressBar>
                    <View style={{ width: '10%' }}>
                      <Style.ProgressGift source={inActiveIcon} />
                    </View>
                  </Style.ProgressContainer>
                </Style.ProfileContainer>
                {/** 關卡 */}
                <Style.PuzzleContainer
                  data={missions}
                  renderItem={(props) => {
                    const { id, passed } = props.item;             
                    return <><Style.PuzzleBlock onPress={() => navigation.navigate('GameDetail', { uid: id, pass: passed })}><Style.PuzzlePng source={props.item.img} resizeMode="cover" /></Style.PuzzleBlock></>
                  }}
                  keyExtractor={item => item.id}
                  numColumns={4}
                />


                {/* <View style={{  justifyContent: 'space-between' }}>
                  <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
                  <Style.ProgressText>{missionList.filter(m => m.pass === 1).length}/{missionList.length}</Style.ProgressText>
                </View> */}
                {/* {
                  missionList.map((mission, mission_index) => (
                    <GameBlock
                      key={mission.uid}
                      mode="game"
                      {...mission}
                      isActive={mission_index <= (lastPassIndex + 1)} // 關卡必須按照順序過
                      navigation={navigation}
                    />
                  ))
                } */}
                {/* {
                  isLoaded && (
                    <GameBlock
                      mode="reward"
                      // 是否全部破關
                      pass={missionList.filter(m => m.pass === 1).length === missionList.length}
                      navigation={navigation}
                      onOpenModalReward={onOpenModalReward}
                    />
                  )
                } */}
              </View>
            )
        }
      </Style.GameContainer>

      {
        modalWelcomeVisible && (
          <ModalGameInfo
            intro={intro}
            visible={modalWelcomeVisible}
            onClose={async () => {
              onCloseModalWelcome();
              await AsyncStorage.setItem('hasPlayed', JSON.stringify(true));
            }}
          />
        )
      }

      {
        state.passed === 12 && state.openCompleteModal && 
        <ModalReward reward={reward} visible={state.openCompleteModal} onClose={()=>{setState({ ...state, openCompleteModal:false });}} isComplete />
        
      }


      {
        modalRewardVisible && (
          <ModalReward reward={reward} visible={modalRewardVisible} onClose={onCloseModalReward} />
        )
      }

    </Style.ScrollContainer>
    </>
  );
}
Game.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')
export default function (props) {
  const navigation = useNavigation();
  return <Game {...props} navigation={navigation} />
}

