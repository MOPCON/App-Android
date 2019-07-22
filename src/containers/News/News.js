import React from 'react';
import { ScrollView, Linking, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

const parseDate = string => {

};

export default class News extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'news.title', 'mode1')

  state = {
    news: [],
  }

  async componentDidMount() {
    const newsText = await AsyncStorage.getItem('news');
    const news = JSON.parse(newsText).payload;

    this.setState({ news });
  }

  openLink = (url) => {
    Linking.openURL(url);
  }

  render() {
    const { news } = this.state;
    console.log(news);
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.NewsContainer>
          {
            news.map((n, i) => (
              <TouchableOpacity onPress={() => this.openLink(n.link)}>
                <Style.NewsCardView>
                  <Style.NewsTimeContainer>
                    <Style.NewsTimeText>{n.time.split(' ')[0]}</Style.NewsTimeText>
                    <Style.NewsTimeText>{n.time.split(' ')[1]}</Style.NewsTimeText>
                  </Style.NewsTimeContainer>
                  <Style.NewsCardTitleText>{n.title}</Style.NewsCardTitleText>
                  <Style.NewsCardDescText>
                    {n.description}
                  </Style.NewsCardDescText>
                </Style.NewsCardView>
              </TouchableOpacity>
            ))
          }
        </Style.NewsContainer>
      </ScrollView>
    );
  }
}


// <Button color="inverse" text={I18n.t('news.link')} align="flex-end" margin={[0, 0, 0, 0]} onClick={() => this.openLink(n.link)} />