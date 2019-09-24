import React from 'react';
import { ScrollView, Linking, TouchableOpacity } from 'react-native';
import moment from 'dayjs';
import apiServices from '../../api/services';
import * as Style from './style';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import Button from '../../components/Button/Button';

export default class News extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'news.title', 'mode1')

  state = {
    news: [],
  }

  async componentDidMount() {
    const { data: news } = await apiServices.get('/news');
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
        {
          news.length
            ? (
              <Style.NewsContainer>
                {
                  news.map((n, i) => (
                    <TouchableOpacity key={n.id} onPress={() => this.openLink(n.link)}>
                      <Style.NewsCardView>
                        <Style.NewsTimeContainer>
                          <Style.NewsTimeText>{moment(n.date * 1000).format('YYYY/MM/DD')}</Style.NewsTimeText>
                          <Style.NewsTimeText>{moment(n.date * 1000).format('HH:mm')}</Style.NewsTimeText>
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
            )
            : (<LoadingIcon size="large" color="#ffffff" />)
        }
      </ScrollView>
    );
  }
}


// <Button color="inverse" text={I18n.t('news.link')} align="flex-end" margin={[0, 0, 0, 0]} onClick={() => this.openLink(n.link)} />