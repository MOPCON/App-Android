import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import ModalReward from '../../components/ModalReward/ModalReward';
import Button from '../../components/Button/Button';
import GameBlock from './GameBlock';
import gameServices from '../../api/gameServices';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';

export default class Game extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')

  state = {
    modalWelcomeVisible: false,
    modalRewardVisible: false,
    score: 1,
    intro: {},
    missionList: [],
    rewardList: [],
  }

  loadGameList = async () => {
    const { data: me } = await gameServices.get('/me');

    this.setState({
      missionList: me.mission_list,
      rewardList: me.reward_list,
    });
  }

  async componentDidMount() {
    SplashScreen.hide();
    this.loadGameList();

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
    const { rewardList } = this.state;
    this.props.navigation.navigate('Reward', { rewardList: rewardList });
  }

  render() {
    const { navigation } = this.props;
    const { modalWelcomeVisible, modalRewardVisible, score, intro, missionList } = this.state;

    return (
      <Style.GameContainer>
        <Style.ScrollContainer>
          <View>
            {/** 上方頭像、分數 */}
            <Style.ProfileContainer>
              <Style.UserIcon source={avatarUser} />
              <View style={{ justifyContent: 'space-around' }}>
                <Style.TotalText>{I18n.t('game.total_score')}</Style.TotalText>
                <Button onClick={this.goReward} color="inverse" text={I18n.t('game.my_reward')} margin={[0, 0, 0, 0]} />
              </View>
              {
                // <View style={{ flex: 1, alignItems: 'flex-end' }}>
                //   <Style.ScoreText>{score}</Style.ScoreText>
                // </View>
              }
            </Style.ProfileContainer>
           {/** 關卡 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
              <Style.ProgressText>{score}/{missionList.length}</Style.ProgressText>
            </View>
            {
              missionList.map(mission => <GameBlock {...mission} mode="game" navigation={navigation} />)
            }
            <GameBlock mode="reward" navigation={navigation} onOpenModalReward={this.onOpenModalReward} />
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
