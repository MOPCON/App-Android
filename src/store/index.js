import React, { Component, createContext } from 'react';
import { AsyncStorage } from 'react-native';
import produce from 'immer';
import BoothMissionJSON from '../../BoothMission.json';
import QuizJSON from '../../Quiz.json';
import { AsyncSubject } from 'rx';

const myContext = createContext();

export const MISSION_STATUS = {
  NOT_CHALLANGE: '1',
  NOT_OPEN: '0',
  SUCCESS: '2',
  FAIL: '-1',
};

export default class Provider extends Component {
  setBalance = async (balance) => {
    await AsyncStorage.setItem('balance', String(balance));
    this.setState(state => produce(state, (draftState) => {
      draftState.missionStore.balance = +(balance);
    }));
  }

  setQuizStatus = async (id, status, wrongAnswer) => {
    const index = this.state.missionStore.quizs.findIndex(o => o.id === id);

    if (index !== -1) {
      const newQuizs = produce(this.state.missionStore.quizs, (quiz) => {
        quiz[index].status = status;
        if (wrongAnswer) quiz[index].wrongAnswer = wrongAnswer;
      });

      await AsyncStorage.setItem('quizs', JSON.stringify(newQuizs));

      this.setState(state => produce(state, (draftState) => {
        draftState.missionStore.quizs = newQuizs;
      }));
    }
  }

  sortQuizs = (quizs) => {
    return quizs = [
      ...quizs.filter(o => o.status === MISSION_STATUS.NOT_CHALLANGE),
      ...quizs.filter(o => o.status === MISSION_STATUS.NOT_OPEN),
      ...quizs.filter(o => o.status === MISSION_STATUS.SUCCESS),
      ...quizs.filter(o => o.status === MISSION_STATUS.FAIL),
    ];
  }

  state = {
    missionStore: {
      balance: 0,
      setBalance: this.setBalance,

      quizs: [],
      setQuizStatus: this.setQuizStatus,
    },
  }

  async componentDidMount() {
    let balance = await AsyncStorage.getItem('balance');
    if (!balance) {
      balance = 0;
      await AsyncStorage.setItem('balance', String(balance));
    }

    let quizs = await AsyncStorage.getItem('quizs');
    if (!quizs) {
      quizs = JSON.stringify([
        ...QuizJSON,
        ...BoothMissionJSON,
      ]);
      await AsyncStorage.setItem('quizs', quizs);
    }


    this.setState(state => produce(state, (draftState) => {
      draftState.missionStore.balance = +(balance);
      draftState.missionStore.quizs = this.sortQuizs(JSON.parse(quizs));
    }));
  }

  render() {
    return (
      <myContext.Provider value={this.state}>
        {this.props.children}
      </myContext.Provider>
    );
  }
}

export const Consumer = (...stores) => (ComposedComponent) => {
  class ConsumerComponent extends Component {
    static navigationOptions = ComposedComponent.navigationOptions

    render() {
      return (
        <myContext.Consumer>
          { (context) => {
            if (stores.length === 0) return <ComposedComponent context={context} />;

            const newContext = Object.keys(context).reduce((acc, key) => {
              if (stores.includes(key)) return {...acc, [key]: context[key]};
                return acc;
            }, {});

            return <ComposedComponent context={newContext} {...this.props}/>;
           }
          }
        </myContext.Consumer>
      );
    }
  }
  return ConsumerComponent;
};