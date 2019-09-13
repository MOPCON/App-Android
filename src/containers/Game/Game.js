import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import { Consumer } from '../../store';
import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import ModalReward from '../../components/ModalReward/ModalReward';
import Button from '../../components/Button/Button';
import GameBlock from './GameBlock';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';

@Consumer('gameStore')
export default class Game extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')

  state = {
    modalWelcomeVisible: false,
    modalRewardVisible: false,
    intro: {},
  }

  async componentDidMount() {
    SplashScreen.hide();
    const { loadGameList } = this.props.context.gameStore;
    loadGameList();

    const [
      hasPlayed,
      { data: intro }
    ] = await Promise.all([
      AsyncStorage.getItem('hasPlayed'),
      gameServices.get('/intro')
    ]);

    // 第一次進入遊戲才會出現
    this.setState({
      modalWelcomeVisible: hasPlayed !== 'true',
      intro,
    });
  }

  onCloseModalWelcome = () => {
    this.setState({ modalWelcomeVisible: false });
  }

  onOpenModalReward = () => {
    this.setState({ modalRewardVisible: true });
  }

  onCloseModalReward = () => {
    this.setState({ modalRewardVisible: false });
  }

  goReward = () => {
    const { rewardList } = this.props.context.gameStore;

    // has_won: 1 才是獲得的獎勵
    this.props.navigation.navigate('Reward', { rewardList });
  }

  render() {
    const { navigation } = this.props;
    const {
      modalWelcomeVisible, modalRewardVisible, intro,
    } = this.state;

    const { score, missionList, isLoaded, lastPassIndex } = this.props.context.gameStore;

    return (
      <Style.GameContainer>
        <Style.ScrollContainer>
          <View>
            {/** 上方頭像、分數 */}
            <Style.ProfileContainer>
              <Style.UserIcon source={avatarUser} />
              <View style={{ justifyContent: 'space-around' }}>
                <Style.TotalText>{I18n.t('game.total_score')}</Style.TotalText>
                <Button disabled={!isLoaded} onClick={this.goReward} color="inverse" text={I18n.t('game.my_reward')} margin={[0, 0, 0, 0]} />
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Style.ScoreText>{score}</Style.ScoreText>
              </View>
            </Style.ProfileContainer>
           {/** 關卡 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
              <Style.ProgressText>{missionList.filter(m => m.pass === 1).length}/{missionList.length}</Style.ProgressText>
            </View>
            {
              missionList.map((mission, mission_index) => (
                <GameBlock
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
                  pass={missionList.filter(m => m.pass === 1).length === missionList.length}
                  navigation={navigation}
                  onOpenModalReward={this.onOpenModalReward}
                />
              )
            }
          </View>
        </Style.ScrollContainer>

        {
          modalWelcomeVisible && (
            <ModalGameInfo
              intro={intro}
              visible={modalWelcomeVisible}
              onClose={async () => {
                this.onCloseModalWelcome();
                await AsyncStorage.setItem('hasPlayed', JSON.stringify(true));
              }}
            />
          )
        }

        {
          modalRewardVisible && (
            <ModalReward visible={modalRewardVisible} onClose={this.onCloseModalReward} />
          )
        }
      </Style.GameContainer>
    );
  }
}
