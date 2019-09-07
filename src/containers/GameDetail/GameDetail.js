import React, { Component } from 'react';
import { View } from 'react-native';

import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';
import ModalFinish from '../../components/ModalFinish/ModalFinish';
import gameServices from '../../api/gameServices';

import * as Style from './style';

export default class GameDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'gameDetail.title', 'mode2')

  state = {
    modalFinishVisible: false,
    game: {},
  }

  async componentDidMount() {
    const { uid } = this.props.navigation.state.params;
    const { data } = await gameServices.get(`/getTask/${uid}`);
    this.setState({
      game: data,
    });
  }

  onOpenModalFinish = () => {
    this.setState({ modalFinishVisible: true });
  }

  onCloseModalFinish = () => {
    this.setState({ modalFinishVisible: false });
  }

  render() {
    const { modalFinishVisible, game } = this.state;
    const lang = I18n.locale;

    return (
      <Style.Container>
        <Style.ScrollContainer>
          <View>
            <Style.StageImage source={{ uri: game.image }} />
            <Style.Title>{lang === 'zh' ? game.name : game.name_e}</Style.Title>
            <Style.Content>{lang === 'zh' ? game.description : game.description_e}</Style.Content>

            <Button onClick={this.onOpenModalFinish} color="primary" text={I18n.t('gameDetail.scan')} margin={[0, 0, 0, 0]} />

            {
              modalFinishVisible && (
                <ModalFinish visible={modalFinishVisible} onClose={this.onCloseModalFinish} />
              )
            }
          </View>
        </Style.ScrollContainer>
      </Style.Container>
    )
  }
}
