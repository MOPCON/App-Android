import React, { Component } from 'react';
import { Text } from 'react-native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

const fakeItems = [
  { value: 'A', text: '書是理想的伴侶，也不免加添他們的煩愁' },
  { value: 'B', text: '書是理想的伴侶，也不免加添他們的煩愁' },
  { value: 'C', text: '書是理想的伴侶，也不免加添他們的煩愁' },
  { value: 'D', text: '書是理想的伴侶，也不免加添他們的煩愁' },
]

export default class QA extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qa.title', 'mode2')

  state = {
    selected: null
  }

  handleSelect = (value) => {
    this.setState({
      selected: value
    });
  }

  render() {
    const { selected } = this.state;

    return (
      <Style.QAContainer>
        <Style.Question>區塊鏈為什麼叫做區塊鏈？</Style.Question>
        {
          fakeItems.map(i => (
            <Style.AnswerContainer>
              <Style.AnswerButton
                selected={selected === i.value}
                onPress={() => this.handleSelect( i.value)}
              >
                <Style.AnswerButtonText selected={selected ===  i.value}>{ i.value}</Style.AnswerButtonText>
              </Style.AnswerButton>
              <Style.AnswerText>{i.text}</Style.AnswerText>
            </Style.AnswerContainer>
          ))
        }
      </Style.QAContainer>
    );
  }
}