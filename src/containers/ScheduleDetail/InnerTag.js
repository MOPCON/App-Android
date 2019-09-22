import React from 'react';
import styled from 'styled-components/native';

const KeynoteContainer = styled.View`
  padding: 2px 6px;
  background-color: ${p => p.bg};
  border-radius: 3px;
  border: 1px;
  border-color: ${p => p.bdc};
  margin-right: 10px;
`;

const KeynoteText = styled.Text`
  font-size: 10px;
  color: ${p => p.color};
`;

export const Keynote = () => (
  <KeynoteContainer bg="#ff4492" bdc="#ff4492">
    <KeynoteText color="white">Keynote</KeynoteText>
  </KeynoteContainer>
);

export const DontRecord = () => (
  <KeynoteContainer bg="transparent" bdc="#ff4492">
    <KeynoteText color="#ff4492">禁止錄影</KeynoteText>
  </KeynoteContainer>
);

export const IsSponsor = () => (
  <KeynoteContainer bg="transparent" bdc="#98ce02">
    <KeynoteText color="#98ce02">伙伴議程</KeynoteText>
  </KeynoteContainer>
);

export const Level = ({children}) => (
  <KeynoteContainer bg="transparent" bdc="#01aaf0">
    <KeynoteText color="#01aaf0">{children}</KeynoteText>
  </KeynoteContainer>
);