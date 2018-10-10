import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import * as Style from './style';

export default class ModalGameInfo extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
  }

  state = {
    text: '',
    hasCheckView: false,
  }

  async componentDidMount() {
    this.UUID = await AsyncStorage.getItem('UUID');
    this.public_key = await AsyncStorage.getItem('public_key');
    console.log('modal mount');
  }

  onClickExchange = () => {
    const { text } = this.state;
    const regexp = /^(mopcon)\d{2}$/;
    const testResult = regexp.test(text.toLowerCase());
    if (testResult) {
      this.setState({ hasCheckView: true })
    }
  }

  onChangeText = (text) => {
    this.setState({ text });
  }
  render() {
    const { visible, onClose } = this.props;
    const { text } = this.state;
    return (
      <Style.ModalContainer
        transparent
        visible={visible}
        onRequestClose={onClose}>
        <Style.BodyContainer>
          <Style.InfoContainer>
            <Style.TextInput
              placeholder="請輸入兌換密碼"
              placeholderTextColor="#00d0cb"
              onChangeText={this.onChangeText}
              value={text}
            />
            <Style.ButtonsContainer>
              <Button onClick={onClose} text="close" margin={[16, 16, 16, 0]} />
              <Button color="primary" onClick={this.onClickExchange} text="Submit" />
            </Style.ButtonsContainer>
          </Style.InfoContainer>
        </Style.BodyContainer>
      </Style.ModalContainer>
    );
  }
}

