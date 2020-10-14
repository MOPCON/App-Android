import React from 'react';
import { View } from 'react-native';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import I18n from '../../locales';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import Button, { FilledButton } from '../../components/Button/Button';
import ModalFinish from '../../components/ModalFinish/ModalFinish';
import gameServices from '../../api/gameServices';

import * as Style from './style';
import { useNavigation } from "@react-navigation/native";

const GameDetail = ({ navigation, uid, pass }) => {
  const [ modalFinishVisible, setModalFinishVisible ] = React.useState(false)
  const [ isLoading, setLoading ] = React.useState(true)
  const [ game, setGame ] = React.useState({})

  React.useLayoutEffect(() => {
    navigation.setOptions(NavigationOptions(navigation, 'gameDetail.title', 'mode2'));
  }, [navigation]);

  React.useEffect(() => {
    const fetchGameTask = async () => {
      const { data } = await gameServices.get(`/getTask/${uid}`);

      setGame(data)
      setLoading(false)
    }

    fetchGameTask();
  }, [])


  const onOpenModalFinish = () => {
    setModalFinishVisible(true)
  }

  const onCloseModalFinish = () => {
    setModalFinishVisible(false)
  }

  const goScan = () => {
    navigation.navigate('QRCode', {uid: game.uid});
  }

  const lang = I18n.locale;


  return (
    <Style.ScrollContainer contentContainerStyle={{ flexGrow: 1 }}>
      <Style.Container>
        {
          isLoading
            ? (
              <LoadingIcon size="large" color="#ffffff" />
            )
            : (
              <View>
                <Style.StageImage source={{ uri: game.image }} />
                <Style.Title>{lang === 'zh' ? game.name : game.name_e}</Style.Title>
                <Style.Content>{lang === 'zh' ? game.description : game.description_e}</Style.Content>

                {
                  pass ? (
                    <FilledButton
                      disabled
                      color="disabled"
                      text={I18n.t('gameDetail.mission_completed')}
                      margin={[ 0, 0, 0, 0 ]} />
                  ) : (
                    <FilledButton
                      // onClick={onOpenModalFinish}
                      onClick={goScan}
                      color="primary"
                      text={I18n.t('gameDetail.scan')}
                      margin={[ 0, 0, 0, 0 ]}
                    />
                  )
                }

                {
                  modalFinishVisible && (
                    <ModalFinish visible={modalFinishVisible} onClose={onCloseModalFinish} />
                  )
                }
              </View>
            )
        }
      </Style.Container>
    </Style.ScrollContainer>
  )
}


export default function (props) {
  const navigation = useNavigation();
  const uid = props.navigation.getParam('uid');
  const pass = props.navigation.getParam('pass');

  return <GameDetail {...props} navigation={navigation} uid={uid} pass={pass} />
}

