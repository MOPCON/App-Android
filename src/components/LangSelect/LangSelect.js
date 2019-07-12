import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Container = styled.View`
  flex-direction: row;
  width: 70px;
  justify-content: space-between;
`;
const TextContainer = styled.Text`
  color: ${p => (p.active ? 'white' : '#878787')};
`;
const TouchArea = styled.TouchableOpacity``;

const LangSelect = ({ language, onChange }) => {
  const onPressZH = () => onChange('zh');
  const onPressEN = () => onChange('en');
  return (
    <Container>
      <TouchArea onPress={onPressZH}>
        <TextContainer active={language === 'zh'}>中文</TextContainer>
      </TouchArea>
      <TextContainer>|</TextContainer>
      <TouchArea onPress={onPressEN}>
        <TextContainer active={language === 'en'}>EN</TextContainer>
      </TouchArea>
    </Container>
  );
};

LangSelect.propTypes = {
  language: PropTypes.string,
  onChange: PropTypes.func,
};

LangSelect.defaultProps = {
  language: 'en',
  onChange: () => { },
}

export default LangSelect;
