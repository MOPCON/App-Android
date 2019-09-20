import styled from 'styled-components/native';

export const SpeakerItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  background-color: white;
  margin-right: 16px;
`;

export const Image = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 80px;
`;

export const ContentContainer = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-bottom: 8px;
`;

export const Info = styled.Text`
  font-size: 12px;
  color: #fff;
  opacity: 0.6;
  margin-bottom: 8px;
  flex: 1;
  flex-wrap: wrap;
`;