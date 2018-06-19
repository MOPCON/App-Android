import React from 'react';
import styled from 'styled-components/native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import { darkBlue } from '../../theme/index';

const SDContainer = styled.View`
  background-color: ${darkBlue};
  flex: 1;
`;
const SDScrollView = styled.ScrollView``;
const HeaderImage = styled.Image`
  width: 100%;
  height: 200px;
  background-color: #ccc;
`;
const IntroContainer = styled.View`
  padding: 16px;
`;
const TypeText = styled.Text`

`;
const Style = {SDContainer, SDScrollView, HeaderImage, IntroContainer, TypeText};

export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'scheduleDetail.title')
  render() {
    return (
      <Style.SDScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.HeaderImage source={{uri:'https://picsum.photos/700/1000/?image=1059'}} />
          <Style.IntroContainer>
            <Style.TypeText>Mobile App & ENG</Style.TypeText>
          </Style.IntroContainer>
        </Style.SDContainer>
      </Style.SDScrollView>
    );
  }
}