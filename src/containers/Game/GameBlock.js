import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Button from '../../components/Button/Button';
import iconCheck from '../../images/icon/iconCheck.png';
import iconCheckActive from '../../images/icon/iconCheckActive.png';
import { scheduleCardTypeColor } from '../../theme/index';

const Container = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 6px;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;

  ${
    p => (p.mode === 'game' && p.completed) ? `
      background-color: #0b425e;
    ` : `
      border: 1px solid ${scheduleCardTypeColor};
    `
  }
`;

const CheckIcon = styled.Image`
  width: 20px;
  height: 16px;
  margin-right: 30px;
`;

const StageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const StageText = styled.Text`
  color: #fff;
  font-size: 18px;
`;

const RewardTip = styled.Text`
  font-size: 18px;
  color: #878787;
  margin-top: 10px;
`;

const GameBlock = (props) => {
  const { mode, name, score, completed, onOpenModalReward } = props;

  return (
    <Container mode={mode} completed={completed} disabled={mode === 'reward'}>
      <CheckIcon source={completed ? iconCheckActive : iconCheck} />
      {
        mode === 'game' && (
          <StageContainer>
            <StageText>{name}</StageText>
            <StageText>{score}分</StageText>
          </StageContainer>
        )
      }
      {
        mode === 'reward' && (
          <StageContainer>
            <View>
              <StageText>領取獎勵</StageText>
              <RewardTip>需完成所有任務</RewardTip>
            </View>
            <Button disabled={!completed} color="primary" onClick={onOpenModalReward} text="領取獎勵" margin={[0, 0, 0, 0]} />
          </StageContainer>
        )
      }
    </Container>
  );
}

export default GameBlock;
