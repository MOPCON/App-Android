import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;
  height: 56px;
  border-radius: 6px;
  background-color: #0C3449;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 16px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: white;
`;

const CommonScheduleItem = ({ time, title }) => {
  return (
    <Container>
      <Text>{time}</Text>
      <Text>{title}</Text>
    </Container>
  );
};

export default CommonScheduleItem;