import React from 'react';
import { ScrollView } from 'react-native';
import * as Style from './style';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

export default class News extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'news.title', 'mode1')
  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.NewsContainer>
          <Style.NewsCardView>
            <Style.NewsTimeText>10:17pm 03/17/2018</Style.NewsTimeText>
            <Style.NewsCardTitleText>任務遊戲倒數 20 分鐘！</Style.NewsCardTitleText>
            <Style.NewsCardDescText>
              還沒搜集到的朋友，快來看 360 直播影片，就知道所有隱藏版徽章位置！
            </Style.NewsCardDescText>

            <Button color="inverse" text="訊息連結" align="flex-end" margin={[0, 0, 0, 0]} />

          </Style.NewsCardView>
        </Style.NewsContainer>
      </ScrollView>
    );
  }
}