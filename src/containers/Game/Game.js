import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import ModalReward from '../../components/ModalReward/ModalReward';
import Button from '../../components/Button/Button';
import GameBlock from './GameBlock';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';

const DATA = [
  {
    id: 1,
    mode: 'game',
    name: '第一關',
    score: 1,
    completed: true,
  },
  {
    id: 2,
    mode: 'game',
    name: '第二關',
    score: 1,
    completed: false,
  },
  {
    id: 3,
    mode: 'game',
    name: '第三關',
    score: 1,
    completed: false,
  },
  {
    id: 4,
    mode: 'game',
    name: '第四關',
    score: 1,
    completed: false,
  },
  {
    id: 5,
    mode: 'game',
    name: '第五關',
    score: 1,
    completed: false,
  },
  {
    id: 6,
    mode: 'game',
    name: '第六關',
    score: 1,
    completed: false,
  },
  {
    id: 7,
    mode: 'game',
    name: '第七關',
    score: 1,
    completed: false,
  },
  {
    id: 8,
    mode: 'game',
    name: '第八關',
    score: 1,
    completed: false,
  },
  {
    mode: 'reward',
    completed: false,
  }
]

export default class Game extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')

  state = {
    modalWelcomeVisible: false,
    modalRewardVisible: false,
    score: 1,
  }

  componentDidMount() {
    SplashScreen.hide();
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

  render() {
    const { modalWelcomeVisible, modalRewardVisible, score } = this.state;

    return (
      <Style.GameContainer>
        <Style.ScrollContainer>
          <View>
            {/** 上方頭像、分數 */}
            <Style.ProfileContainer>
              <Style.UserIcon source={avatarUser} />
              <View style={{ justifyContent: 'space-around' }}>
                <Style.TotalText>{I18n.t('game.total_score')}</Style.TotalText>
                <Button onClick={() => {}} color="inverse" text={I18n.t('game.my_reward')} margin={[0, 0, 0, 0]} />
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end' }}>
                <Style.ScoreText>{score}</Style.ScoreText>
              </View>
            </Style.ProfileContainer>
           {/** 關卡 */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
              <Style.ProgressText>{score}/8</Style.ProgressText>
            </View>
            {
              DATA.map(data => <GameBlock {...data} onOpenModalReward={this.onOpenModalReward} />)
            }
          </View>
        </Style.ScrollContainer>

        {
          modalWelcomeVisible && (
            <ModalGameInfo visible={modalWelcomeVisible} onClose={this.onCloseModalWelcome} />
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
