import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';
import ModalExchange from '../../components/ModalExchange/ModalExchange';
import * as Style from './style';

const DATA = [
  {
    title: '義美霜淇淋一個',
    desc: '可兌換義美霜淇淋一個(不挑款)，至3F主辦單位服務台兌換',
  },
  {
    title: '美式熱咖啡一杯',
    desc: '可兌換美式熱咖啡一杯，至3F主辦單位服務台兌換',
  },
];

export default class Reward extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.my_reward', 'mode2')

  state = {
    isModalVisible: false,
  }

  onCloseModal = () => this.setState({ isModalVisible: false });

  onOpenModal = () => this.setState({ isModalVisible: true });

  render() {
    const { isModalVisible } = this.state;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.RewardContainer>
          {
            DATA.map(data => (
              <Style.RewardCard>
                <Style.RewardImage />
                <Style.RewardInfo>
                  <Style.Title>{data.title}</Style.Title>
                  <Style.Desc>{data.desc}</Style.Desc>
                  <View>
                    <Button color="primary" onClick={this.onOpenModal} text="直接兌換" margin={[0, 0, 0, 0]} />
                  </View>
                </Style.RewardInfo>
              </Style.RewardCard>
            ))
          }

          {
            <ModalExchange visible={isModalVisible} onClose={this.onCloseModal} />
          }
        </Style.RewardContainer>
      </ScrollView>
    );
  }
}