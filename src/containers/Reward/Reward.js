import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';
import ModalExchange from '../../components/ModalExchange/ModalExchange';
import * as Style from './style';

export default class Reward extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.my_reward', 'mode2')

  state = {
    isModalVisible: false,
    active: null,
  }

  onCloseModal = () => this.setState({ isModalVisible: false });

  onOpenModal = (uid) => this.setState({ isModalVisible: true, active: uid });

  render() {
    const { isModalVisible, active } = this.state;
    const { rewardList } = this.props.navigation.state.params;
    const lang = I18n.locale;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.RewardContainer>
          {
            rewardList.map(reward => (
              <Style.RewardCard>
                <Style.RewardImage source={{ uri: reward.image }} />
                <Style.RewardInfo>
                  <Style.Title>{lang === 'zh' ? reward.name : reward.name_e}</Style.Title>
                  <Style.Desc>{lang === 'zh' ? reward.description : reward.description_e}</Style.Desc>
                  <View>
                    <Button color="primary" onClick={() => this.onOpenModal(reward.uid)} text={I18n.t('game.exchange')} margin={[0, 0, 0, 0]} />
                  </View>
                </Style.RewardInfo>
              </Style.RewardCard>
            ))
          }

          {
            <ModalExchange visible={isModalVisible} active={active} onClose={this.onCloseModal} />
          }
        </Style.RewardContainer>
      </ScrollView>
    );
  }
}