import React, { Component } from 'react';
import { View } from 'react-native';
import * as Style from './style';

export default class Quiz extends Component {
  state = {
    selected: '',
  }

  handleClick = (option) => {
    this.setState({
      selected: option
    });
  }

  render() {
    const { selected } = this.state;
    const { quiz } = this.props;

    return (
      <Style.QuizContainer>
        <Style.QuizTitle>{ quiz.title }</Style.QuizTitle>
        <Style.QuizOptionContainer>
          {
            quiz.options.map((q, i) => {
              const option = String.fromCharCode(65 + +(i));
              const active = option === selected;

              return (
                <Style.QuizContent onPress={() => this.handleClick(option)}>
                  <Style.QuizOption active={active}>
                    <Style.QuizOptionText active={active}>{option}</Style.QuizOptionText>
                  </Style.QuizOption>
                  <Style.QuizText>{q}</Style.QuizText>
                </Style.QuizContent>
              );
            })
          }
        </Style.QuizOptionContainer>
      </Style.QuizContainer>
    );
  }
}