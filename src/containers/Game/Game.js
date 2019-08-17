import React, { Component } from 'react';
import SplashScreen from 'react-native-splash-screen';

import ModalGameInfo from '../../components/ModalGameInfo/ModalGameInfo';
import * as Style from './style';

export default class Game extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.title', 'mode1')

  state = {
    modalVisible: true,
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  onCloseModal = () => {
    this.setState({ modalVisible: false });
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <Style.GameContainer>
        <Style.ScrollContainer>
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
