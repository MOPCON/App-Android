import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  modBorder,
} from '../../theme/index';
import I18n from '../../locales';
import iconCoinImg from '../../images/icon/iconCoin.png';
import iconCapsuleImg from '../../images/icon/iconCapsule.png';

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
  padding: 20px;
`;

const TopZone = styled.View`
  flex-direction: row;
`;

const BottomZone = styled.View`
  width: 100%;
  flex: 1;
`;

const RightArrow = styled.Text`
  color: #fff;
  font-size: 40px;
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
  margin: 0 10px;
`;


export default class Exchange extends Component {
  render() {
    return (
      <Container>
        <Wallet>
          <Zone>
            <TopZone>
              <Icon source={iconCoinImg} />
              <Text>{I18n.t('missionTable.total_dollar')}</Text>
            </TopZone>
            <BottomZone>
              <LargeText>9000</LargeText>
            </BottomZone>
          </Zone>
          <RightArrow>→</RightArrow>
          <Zone>
            <TopZone>
              <Icon source={iconCapsuleImg} />
              <Text>{I18n.t('missionTable.capsule_toy')}</Text>
            </TopZone>
            <BottomZone>
              <LargeText>50</LargeText>
            </BottomZone>
          </Zone>
        </Wallet>
        <Button>
          <ButtonText>{I18n.t('missionTable.exchange')}</ButtonText>
        </Button>
      </Container>
    );
  }
}