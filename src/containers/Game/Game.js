import React, { Component } from 'react';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import I18n from '../../locales';
import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import Button from '../../components/Button/Button';
import avatarUser from '../../images/avatar/avatarUser.png';
import * as Style from './style';

export default class Game extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')

  state = {
    modalVisible: false,
    score: 1,
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const { modalVisible, score } = this.state;

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Style.ProgressTitleText>{I18n.t('game.progress')}</Style.ProgressTitleText>
              <Style.ProgressText>{score}/8</Style.ProgressText>
            </View>
          </View>
        </Style.ScrollContainer>

        {
          modalVisible && (
            <ModalGameInfo visible={modalVisible} onClose={this.onCloseModal} />
          )
        }
      </Style.GameContainer>
    );
  }
}
