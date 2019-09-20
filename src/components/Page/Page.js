import React from 'react';
import { ScrollView, View } from 'react-native';
import I18n from '../../locales';
import * as Style from './Style';

const Main = (props) => {
  const { children, title } = props;

  return (
    <Style.Main>
      {
        title && (
          <Style.Title>
            <Style.TitleText>{I18n.t(title) }</Style.TitleText>
          </Style.Title>
        )
      }
      {/** 不加height的話，NavBar就會被children蓋掉 */}
      <ScrollView style={{ height: 200 }} contentContainerStyle={{ flexGrow: 1 }}>
        { children }
      </ScrollView>
    </Style.Main>
  );
};

export default Main;