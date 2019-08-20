import React, { Component } from 'react';
import { View } from 'react-native';

import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';
import ModalFinish from '../../components/ModalFinish/ModalFinish';

import * as Style from './style';

export default class GameDetail extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'gameDetail.title', 'mode2')

  state = {
    modalFinishVisible: false,
  }

  onOpenModalFinish = () => {
    this.setState({ modalFinishVisible: true });
  }

  onCloseModalFinish = () => {
    this.setState({ modalFinishVisible: false });
  }

  render() {
    const { modalFinishVisible } = this.state;

    return (
      <Style.Container>
        <Style.ScrollContainer>
          <View>
            <Style.StageImage />
            <Style.Title>找到紫色小鴨</Style.Title>
            <Style.Content>舒適理想的伴侶，也不免添加他們的煩愁.......舒適理想的伴侶，也不免添加他們的煩愁.......舒適理想的伴侶，也不免添加他們的煩愁.......舒適理想的伴侶，也不免添加他們的煩愁.......舒適理想的伴侶，也不免添加他們的煩愁.......舒適理想的伴侶，也不免添加他們的煩愁.......</Style.Content>

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
