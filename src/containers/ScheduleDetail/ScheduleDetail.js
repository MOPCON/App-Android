import React from 'react';
import styled from 'styled-components/native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/TextButton';
import { darkBlue, scheduleCardTypeColor } from '../../theme/index';
import imageURISlide from '../../images/buttonSlide.png';
import imageURIStarNormal from '../../images/buttonStarNormal.png';
import imageURIStarChecked from '../../images/buttonStarChecked.png';

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
  color: ${scheduleCardTypeColor};
  font-family: 'Roboto-Medium';
  font-size: 12px;
  letter-spacing: 2px;
  margin-bottom: 8px;
`;
const TitleText = styled.Text`
  color: white;
  font-size: 19px;
  font-family: 'Roboto-Regular';
`;
const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
const DesText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  letter-spacing: 0.3px;
  line-height: 22px;
  font-family: 'Roboto-Regular';
  text-align: justify;
`;

const Style = {
  SDContainer, SDScrollView, HeaderImage,
  IntroContainer, TypeText, TitleText,
  ButtonContainer, DesText,
};

export default class ScheduleDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'scheduleDetail.title')
  render() {
    return (
      <Style.SDScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.HeaderImage source={{ uri: 'https://picsum.photos/700/1000/?image=1063' }} />
          <Style.IntroContainer>
            <Style.TypeText>MOBILE APP & ENG</Style.TypeText>
            <Style.TitleText>如何寫出有效率、好讀、好維護的 Java / Android 程式</Style.TitleText>
            <Style.ButtonContainer>
              <Button iconURI={imageURIStarNormal} text="加入行程" margin={[0, 8, 0, 0]} />
              <Button iconURI={imageURISlide} text="投影片" />
            </Style.ButtonContainer>
            <Style.DesText>
              在軟體公司最痛苦的一件事就是看到前人留下來的程式碼像本天書，看也看不懂、改也改不動，跑起來卻健步如飛，不僅一切正常，勝制連重構後的城市都飽得不如就城市順暢。這個 Session 就是要討論有哪些技巧及新法可以避免寫出這樣難讀、難懂也難維護的程式。
            </Style.DesText>
          </Style.IntroContainer>
        </Style.SDContainer>
      </Style.SDScrollView>
    );
  }
}