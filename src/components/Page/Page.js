import React from 'react';
import { ScrollView, View } from 'react-native';
import I18n from '../../locales';
import * as Style from './Style';

const Main = (props) => {
  const { children, title, headerRight } = props;

  const renderRight = () => (
    <Style.HeaderRight {...headerRight}>
      <Style.HeaderRightText>
        { headerRight ? headerRight.text : '' }
      </Style.HeaderRightText>
    </Style.HeaderRight>
  )

  return (
    <Style.Main>
      {
        title && (
          <Style.Header>
            <Style.HeaderLeft/>
            <Style.HeaderTitle>
              <Style.TitleText>{I18n.t(title)}</Style.TitleText>
            </Style.HeaderTitle>
            { renderRight() }
          </Style.Header>
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