import React from 'react';
import { AsyncStorage } from 'react-native';
import apiServices from '../../api/services';
import PropTypes from 'prop-types';
import I18n from '../../locales';
import Button from '../Button/Button';
import IconPng from '../../images/icon/iconCapsule.png';
import * as Style from './style';

export default class ModalGameInfo extends React.PureComponent {
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
    const regexp = /^(mopcon)(\d{2})$/;
    const testResult = regexp.test(text.toLowerCase());
    if (testResult) {
      this.setState({
        hasCheckView: true,
        exchangeCapsules: parseInt(regexp.exec(text)[2], 10),
      });
    }
  }

  onClickExchangewServer = async () => {
    const { exchangeCapsules } = this.state;
    console.log(exchangeCapsules);
    await apiServices.post('/buy-gachapon', {
      UUID: this.UUID,
      public_key: this.public_key,
      amount: exchangeCapsules,
    });
    this.setState({
      text: '',
      hasCheckView: false,
      exchangeCapsules: 0,
    });
    this.props.onClose();
  }

  onChangeText = (text) => {
    this.setState({ text });
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
                    <Button onClick={onClose} text={I18n.t('common.close')} margin={[16, 16, 16, 0]} />
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
                    <Button onClick={onClose} text={I18n.t('common.close')} margin={[16, 16, 16, 0]} />
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

