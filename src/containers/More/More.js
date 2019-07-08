import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import * as Style from './style';

export default class More extends Component {
  static navigationOptions = ({ navigation }) => NavigationOptions(navigation, 'more.title', 'mode1')

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Style.MoreContainer>
          <Text style={{ color: '#fff' }}>More Page</Text>
        </Style.MoreContainer>
      </ScrollView>
    );
  }
}