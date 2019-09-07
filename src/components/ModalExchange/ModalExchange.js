import React from 'react';
import { Alert, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import apiServices from '../../api/services';
import gameServices from '../../api/gameServices';
import PropTypes from 'prop-types';
import I18n from '../../locales';
import Button from '../Button/Button';
import { Consumer } from '../../store';
import iconExchange from '../../images/icon/iconExchange.png';
import * as Style from './style';

@Consumer('missionStore')
export default class ModalExchange extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  }

  state = {
    text: '',
    hasCheckView: false,
    exchangeCapsules: 0,
  }

  async componentDidMount() {
    this.UUID = await AsyncStorage.getItem('UUID');
    this.public_key = await AsyncStorage.getItem('public_key');
  }

  onClickExchange = async () => {
    const { text } = this.state;
    const { active } = this.props;
    const payload = {
      uid: active,
      vKey: text,
    };

    try {
      const { data } = await gameServices.post('/verify/reward', payload);
      debugger;
    } catch (error) {
      Alert.alert(I18n.t('game.invalid_reward_password'));
    }
    // const parsedText = text.toLowerCase();
    // const regexp = /^(mopcon)(\d{2})$/;
    // const testResult = regexp.test(parsedText);
    // if (testResult) {
    //   this.setState({
    //     hasCheckView: true,
    //     exchangeCapsules: parseInt(regexp.exec(parsedText)[2], 10),
    //   });
    // }
  }

  onClickExchangewServer = async () => {
    const { exchangeCapsules } = this.state;
    const {CAPSULE_RATE, balance, setBalance} =  this.props.context.missionStore;
    if(Math.floor(balance / CAPSULE_RATE) >= exchangeCapsules){
      setBalance(balance - (exchangeCapsules * CAPSULE_RATE));
      this.onClose();
    } else {
      Alert.alert('錢不夠');
      this.onClose();
    }
    
  }

  onChangeText = (text) => {
    this.setState({ text });
  }

  onClose = () => {
    this.setState({
      text: '',
      hasCheckView: false,
      exchangeCapsules: 0,
    });
    this.props.onClose();
  }

  render() {
    const { visible, onClose } = this.props;
    const { text, exchangeCapsules, hasCheckView } = this.state;
    return (
      <Style.ModalContainer
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <Style.BodyContainer>
          {
            hasCheckView
              ? (
                <Style.InfoContainer>
                  <Style.ExchangePng source={iconExchange} />
                  <Style.ExchangeText>
                    {I18n.t('missionTable.exchangeInfo')}
                    <Style.ExchangeCoinText>{exchangeCapsules}</Style.ExchangeCoinText>
                    {I18n.t('missionTable.capsules')}
                  </Style.ExchangeText>
                  <Style.ButtonsContainer>
                    <Button onClick={this.onClose} text={I18n.t('common.close')} margin={[16, 16, 16, 0]} />
                    <Button color="primary" onClick={this.onClickExchangewServer} text={I18n.t('common.ok')} />
                  </Style.ButtonsContainer>
                </Style.InfoContainer>
              )
              : (
                <Style.InfoContainer>
                  <Style.ExchangePng source={iconExchange} />
                  <Style.ExchangeTitle>{I18n.t('game.enter_reward_password')}</Style.ExchangeTitle>
                  <Style.TextInput
                    // placeholder={I18n.t('missionTable.exchangeCode')}
                    // placeholderTextColor="#00d0cb"
                    onChangeText={this.onChangeText}
                    value={text}
                  />
                  <Style.ButtonsContainer>
                    <View style={{ width: 100, height: 50, marginRight: 60 }}>
                      <Button block color="primary" onClick={this.onClickExchange} text={I18n.t('common.ok')} />
                    </View>
                    <View style={{ width: 100, height: 50 }}>
                      <Button block color="inverse" onClick={this.onClose} text={I18n.t('common.close')} margin={[16, 16, 16, 0]} />
                    </View>
                  </Style.ButtonsContainer>
                </Style.InfoContainer>
              )
          }

        </Style.BodyContainer>
      </Style.ModalContainer >
    );
  }
}

