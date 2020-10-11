import React from 'react';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Quiz from './Quiz';
import QRCode from './QRCode';
import * as Style from './style';
import { useNavigation, useRoute } from "@react-navigation/native";

const MissionDetail = ({ navigation, route }) => {
  const { id, type } = route.params;
  return (
    <Style.MissionContainer>
      {
        type === 'quiz'
          ? (
            <Quiz id={id} />
          )
          : (
            <QRCode id={id} navigation={navigation} />
          )
      }
    </Style.MissionContainer>
  );
}
MissionDetail.navigationOptions = ({ navigation }) => NavigationOptions(navigation, `missionDetail.${navigation.state.params.type}`, 'mode2')
export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <MissionDetail {...props} navigation={navigation} route={route} />
}
