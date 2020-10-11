import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import { Consumer } from '../../store';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';
import ModalExchange from '../../components/ModalExchange/ModalExchange';
import iconGift from '../../images/iconGiftActive.png';
import * as Style from './style';

@Consumer('gameStore')
export default class Reward extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'game.my_reward', 'mode2')

  state = {
    isModalVisible: false,
    activeUid: '',
  }

  onCloseModal = () => this.setState({ activeUid: '' });

  onOpenModal = (uid) => this.setState({ isModalVisible: true, activeUid: uid });

  render() {
    const { isModalVisible, activeUid } = this.state;
    const { rewardList } = this.props.context.gameStore;
    const lang = I18n.locale;

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.RewardContainer>
          {
            rewardList.map(reward => (
              <Style.RewardCard key={reward.uid}>
                <Style.RewardImage source={iconGift} />
                <Style.RewardInfo>
                  <Style.Title>{lang === 'zh' ? reward.name : reward.name_e}</Style.Title>
                  <Style.Desc>{lang === 'zh' ? reward.description : reward.description_e}</Style.Desc>
                  <View>
                    {
                      // 是否兌換完成
                      reward.redeemed ? (
                        <Button disabled color="disabled" text={I18n.t('game.redeemed')} margin={[ 0, 0, 0, 0 ]} />
                      ) : (
                        <Button color="primary" onClick={() => this.onOpenModal(reward.uid)}
                                text={I18n.t('game.exchange')} margin={[ 0, 0, 0, 0 ]} />
                      )
                    }
                  </View>
                </Style.RewardInfo>
              </Style.RewardCard>
            ))
          }

          {
            <ModalExchange uid={activeUid} onClose={this.onCloseModal} />
          }
        </Style.RewardContainer>
      </ScrollView>
    );
  }
}
