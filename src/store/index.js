import React, { Component, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import produce from 'immer';
import gameServices from '../api/gameServices';

const myContext = createContext();

export const GlobalContext = myContext;

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
      let newQuizs = produce(this.state.missionStore.quizs, (quiz) => {
        quiz[index].status = status;
        if (wrongAnswer) quiz[index].wrongAnswer = wrongAnswer;
      });

      newQuizs = this.sortQuizs(newQuizs);

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

  loadGameList = async () => {
    const { data: me } = await gameServices.get('/me');

    const passList = me.mission_list.filter(m => m.pass === 1);

    this.setState(state => produce(state, (draftState) => {
      draftState.gameStore.missionList = me.mission_list;
      // 已獲得獎勵
      draftState.gameStore.rewardList = me.reward_list.filter(r => r.has_won);
      draftState.gameStore.score = passList.reduce((score, m) => score + m.point, 0);
      draftState.gameStore.lastPassIndex = passList.length - 1;
      draftState.gameStore.isLoaded = true;
    }));
  }

  state = {
    missionStore: {
      CAPSULE_RATE: 200,
      balance: 0,
      setBalance: this.setBalance,

      quizs: [],
      setQuizStatus: this.setQuizStatus,
    },

    gameStore: {
      missionList: [],
      rewardList: [],
      score: 0,
      lastPassIndex: -1,
      loadGameList: this.loadGameList,
      isLoaded: false,
    }
  }

  async componentDidMount() {
    // this.loadMission();
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
          {(context) => {
            if (stores.length === 0) return <ComposedComponent context={context} />;

            const newContext = Object.keys(context).reduce((acc, key) => {
              if (stores.includes(key)) return { ...acc, [key]: context[key] };
              return acc;
            }, {});

            return <ComposedComponent context={newContext} {...this.props} />;
          }
          }
        </myContext.Consumer>
      );
    }
  }
  return ConsumerComponent;
};
