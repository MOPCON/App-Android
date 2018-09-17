import React from 'react';
import { ScrollView, AsyncStorage, Linking } from 'react-native';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button from '../../components/Button/Button';

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

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.NewsContainer>
          {
            news.map((n, i) => (
              <Style.NewsCardView>
                <Style.NewsTimeText>{n.time}</Style.NewsTimeText>
                <Style.NewsCardTitleText>{n.title}</Style.NewsCardTitleText>
                <Style.NewsCardDescText>
                  {n.description}
                </Style.NewsCardDescText>
                <Button color="inverse" text={I18n.t('news.link')} align="flex-end" margin={[0, 0, 0, 0]} onClick={() => this.openLink(n.link)} />
              </Style.NewsCardView>
            ))
          }
        </Style.NewsContainer>
      </ScrollView>
    );
  }
}