import React from 'react';
import { AsyncStorage, Alert } from 'react-native';
import apiServices from '../../api/services';
import PropTypes from 'prop-types';
import I18n from '../../locales';
import Button from '../Button/Button';
import { Consumer } from '../../store';
import IconPng from '../../images/icon/iconCapsule.png';
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
    console.log('modal mount');
  }

  onClickExchange = () => {
    const { text } = this.state;
    const parsedText = text.toLowerCase();
    const regexp = /^(mopcon)(\d{2})$/;
    const testResult = regexp.test(parsedText);
    if (testResult) {
      console.log(regexp.exec(parsedText));
      this.setState({
        hasCheckView: true,
        exchangeCapsules: parseInt(regexp.exec(parsedText)[2], 10),
      });
    }
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
                  <Style.ExchangePng source={IconPng} />
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
                  <Style.TextInput
                    placeholder={I18n.t('missionTable.exchangeCode')}
                    placeholderTextColor="#00d0cb"
                    onChangeText={this.onChangeText}
                    value={text}
                  />
                  <Style.ButtonsContainer>
                    <Button onClick={this.onClose} text={I18n.t('common.close')} margin={[16, 16, 16, 0]} />
                    <Button color="primary" onClick={this.onClickExchange} text={I18n.t('common.ok')} />
                  </Style.ButtonsContainer>
                </Style.InfoContainer>
              )
          }

        </Style.BodyContainer>
      </Style.ModalContainer >
    );
  }
}

