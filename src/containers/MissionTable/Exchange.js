import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {
  modBorder,
} from '../../theme/index';
import I18n from '../../locales';
import { Consumer } from '../../store';
import iconCoinImg from '../../images/icon/iconCoin.png';
import iconCapsuleImg from '../../images/icon/iconCapsule.png';
import ModalExchange from '../../components/ModalExchange/ModalExchange';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const Wallet = styled.View`
  width: 100%;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-top: 15;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background: ${modBorder};
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 8;
  border-bottom-right-radius: 8;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

const Zone = styled.View`
  flex: 1;
  height: 100%;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

const TopZone = styled.View`
  flex-direction: row;
  width: 100;
`;

const BottomZone = styled.View`
  width: 100%;
  flex: 1;
`;

const RightArrow = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: 600;
  height: 100%;
  margin-top: 6px;
  margin-left: 10px;
`;

const Text = styled.Text`
  color: ${modBorder};
  font-size: 14px;
  font-weight: 600;
`;

const LargeText = styled.Text`
  color: #fff;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
`;

const Icon = styled.Image`
  width: 18;
  height: 18;
  margin: 0 5px;
`;


@Consumer('missionStore')
export default class Exchange extends Component {
  static propTypes = {
    balance: PropTypes.number,
  }
  static defaultProps = {
    balance: 0,
  }
  state = {
    isModalVisible: false,
  }
  onCloseModal = () => this.setState({ isModalVisible: false });
  onOpenModal = () => this.setState({ isModalVisible: true });
  render() {
    const { balance, context: { missionStore: { CAPSULE_RATE } } } = this.props;
    const { isModalVisible } = this.state;
    return (
      <Container>
        <Wallet>
          <Zone>
            <TopZone>
              <Icon source={iconCoinImg} />
              <Text>{I18n.t('missionTable.total_dollar')}</Text>
            </TopZone>
            <BottomZone>
              <LargeText>{balance}</LargeText>
            </BottomZone>
          </Zone>
          <RightArrow>→</RightArrow>
          <Zone>
            <TopZone>
              <Icon source={iconCapsuleImg} />
              <Text>{I18n.t('missionTable.capsule_toy')}</Text>
            </TopZone>
            <BottomZone>
              <LargeText>{Math.floor(balance / CAPSULE_RATE)}</LargeText>
            </BottomZone>
          </Zone>
        </Wallet>
        <Button onPress={this.onOpenModal}>
          <ButtonText>{I18n.t('missionTable.exchange')}</ButtonText>
        </Button>
        <ModalExchange visible={isModalVisible} onClose={this.onCloseModal} />
      </Container>
    );
  }
}