import React from 'react'
import { ScrollView } from 'react-native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

export default class SponsorDetail extends React.Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'sponsor.title', 'mode2')


  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.SDContainer>
          <Style.CardView>
            <Style.CardImg />
          </Style.CardView>
          <Style.SponsorName>Google Cloud</Style.SponsorName>
          <Style.SponsorDesc>
            從現今對即時資料運用要求最高的應用，到雲端封存解決方案 Nearline 與 Coldline，Google Cloud Storage 提供的整合式產品能滿足各種不同的可用性需求，重新定義業界對線上儲存空間的期待。 不論是什麼級別的儲存空間，在 API、延遲與速度方面都有穩定一致的表現。瞭解 Google 的基礎架構為何是您存放重要資料的最佳線上雲端儲存空間。
          </Style.SponsorDesc>
        </Style.SDContainer>
      </ScrollView>
    );
  }
}