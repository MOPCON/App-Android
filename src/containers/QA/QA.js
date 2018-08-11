import React, { Component } from 'react';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

const fakeItems = [
  { value: 'A', text: '書是理想的伴侶，也不免加添他們的煩愁' },
  { value: 'B', text: '書是理想的伴侶，也不免加添他們的煩愁' },
  { value: 'C', text: '書是理想的伴侶，也不免加添他們的煩愁' },
  { value: 'D', text: '書是理想的伴侶，也不免加添他們的煩愁' },
]

export default class QA extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'qa.title', 'mode2')

  state = {
    selected: null,
    answer: 'A',
    showResult: false,
    isCorrect: null,
  }

  handleSelect = (value) => {
    this.setState({
      selected: value
    });
  }

  handleSubmit = () => {
    const { selected, answer } = this.state;

    this.setState({
      showResult: true,
      isCorrect: selected === answer,
    });
  }

  getResult = () => {
    const { isCorrect } = this.state;

    return isCorrect ? (
      <Style.ResultContainer>
        <Style.ResultText>任務完成！獲得</Style.ResultText>
        <Style.ResultCoin>
          <Style.ResultCoinText>25</Style.ResultCoinText>
        </Style.ResultCoin>
      </Style.ResultContainer>
    ) : (
      <Style.ResultContainer>
        <Style.ResultText>任務失敗！</Style.ResultText>
      </Style.ResultContainer>
    );
  }

  render() {
    const { selected, answer, showResult } = this.state;

    return (
      <Style.QAContainer pointerEvents={showResult ? 'none' : 'auto'}>
        <Style.Question>區塊鏈為什麼叫做區塊鏈？</Style.Question>
        {
          fakeItems.map((item, index) => (
            <Style.AnswerContainer key={`QA_${index}`}>
              <Style.AnswerButton
                selected={selected === item.value}
                value={item.value}
                answer={answer}
                showResult={showResult}
                onPress={() => this.handleSelect( item.value)}
              >
                <Style.AnswerButtonText selected={selected ===  item.value}>{ item.value}</Style.AnswerButtonText>
              </Style.AnswerButton>
              <Style.AnswerText>{item.text}</Style.AnswerText>
            </Style.AnswerContainer>
          ))
        }
        <Style.FuncContainer>
          {
            showResult ? (
              this.getResult()
            ) : (
              <Button
                color="primary"
                text="回答"
                margin={[0, 0, 0, 0]}
                onClick={this.handleSubmit}
              />
            )
          }
        </Style.FuncContainer>
      </Style.QAContainer>
    );
  }
}