import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  modBorder,
} from '../../theme/index';
import iconSucessImg from '../../images/icon/iconSucess.png';
import iconFailedImg from '../../images/icon/iconFailed.png';

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 51, 0.7);
  position: absolute;
`;

const EmptyZone = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const Status = styled.View`
  border-style: solid;
  border-top-width: 1;
  border-top-color: ${modBorder};
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StatusText = styled.Text`
  color: ${props => props.status === '1' ? modBorder : '#d13232'};
  font-size: 14px;
`;

const Icon = styled.Image`
  width: 20;
  height: 20;
  margin: 0 10px;
`;

export default class Mask extends Component {
  render() {
    const { status } = this.props;

    return (
      <Container>
        <EmptyZone />
        <Status>
          <Icon source={ status === '1' ? iconSucessImg : iconFailedImg} />
          <StatusText status={status}>
            { status === '1' ? '挑戰成功' : '挑戰失敗' }
          </StatusText>
        </Status>
      </Container>
    );
  }
}