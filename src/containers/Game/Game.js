import React from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import { Consumer } from '../../store';
import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import ModalReward from '../../components/ModalReward/ModalReward';
import Button from '../../components/Button/Button';
import GameBlock from './GameBlock';
import gameServices from '../../api/gameServices';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';
import { useNavigation } from "@react-navigation/native";

const Game = ({ navigation, context }) => {

  const [ state, setState ] = React.useState({
      modalWelcomeVisible: false,
      modalRewardVisible: false,
      intro: {},
      reward: {},
      isLoading: true,
    }
  )
  React.useEffect(() => {
    const firstPlayInitial = async () => {
      const { loadGameList } = context.gameStore;

      const [
        hasPlayed,
        { data: intro },
      ] = await Promise.all([
        AsyncStorage.getItem('hasPlayed'),
        gameServices.get('/intro'),
        loadGameList()
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
  }, [])

  const onCloseModalWelcome = () => {
    setState({ ...state, modalWelcomeVisible: false });
  }

  const onOpenModalReward = (reward) => {
    setState({ ...state, modalRewardVisible: true, reward });
  }

  const onCloseModalReward = () => {
    const { loadGameList } = context.gameStore;
    loadGameList();
    setState({ ...state, modalRewardVisible: false });
  }

  const goReward = () => {
    navigation.navigate('Reward');
  }

  const {
    modalWelcomeVisible, modalRewardVisible, intro, reward,
    isLoading
  } = state;

  const { score, missionList, isLoaded, lastPassIndex } = context.gameStore;

  return (
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
                  <View style={{ justifyContent: 'space-around' }}>
                    <Style.TotalText>{I18n.t('game.total_score')}</Style.TotalText>
                    <Button disabled={!isLoaded} onClick={goReward} color="inverse"
                            text={I18n.t('game.my_reward')} margin={[ 0, 0, 0, 0 ]} />
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Style.ScoreText>{score}</Style.ScoreText>
                  </View>
                </Style.ProfileContainer>
                {/** 關卡 */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
                  <Style.ProgressText>{missionList.filter(m => m.pass === 1).length}/{missionList.length}</Style.ProgressText>
                </View>
                {
                  missionList.map((mission, mission_index) => (
                    <GameBlock
                      key={mission.uid}
                      mode="game"
                      {...mission}
                      isActive={mission_index <= (lastPassIndex + 1)} // 關卡必須按照順序過
                      navigation={navigation}
                    />
                  ))
                }
                {
                  isLoaded && (
                    <GameBlock
                      mode="reward"
                      // 是否全部破關
                      pass={missionList.filter(m => m.pass === 1).length === missionList.length}
                      navigation={navigation}
                      onOpenModalReward={onOpenModalReward}
                    />
                  )
                }
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
        modalRewardVisible && (
          <ModalReward reward={reward} visible={modalRewardVisible} onClose={onCloseModalReward} />
        )
      }
    </Style.ScrollContainer>
  );
}
Game.navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')
export default function (props) {
  const navigation = useNavigation();
  return <Game {...props} navigation={navigation} />
}

