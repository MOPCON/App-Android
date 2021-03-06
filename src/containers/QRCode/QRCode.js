import React from 'react';
import {Dimensions, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../locales';
import produce from 'immer';
import QRCodeScanner from 'react-native-qrcode-scanner';
import apiServices from '../../api/services';
import * as Style from './style';
import LoadingIcon from '../../components/LoadingIcon/LoadingIcon';
import ModalFinish from '../../components/ModalFinish/ModalFinish';
import NavigationOptions from '../../components/NavigationOptions/NavigationOptions';
import {MISSION_STATUS, GlobalContext} from '../../store';
import gameServices from '../../api/gameServices';
import {useNavigation} from "@react-navigation/native";

const QRCode = ({navigation, uid}) => {

    const context = React.useContext(GlobalContext)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [isLoading, setLoading] = React.useState(false)

    React.useLayoutEffect(() => {
        navigation.setOptions(NavigationOptions(navigation, 'qrcode.title', 'mode2'));
      }, [navigation]);

    const onSuccess = async (e) => {
        setLoading(true)
        const vKey = e.data;


        const payload = {
            uid,
            vKey,
        };

        try {
            const {loadGameList} = context.gameStore;
            const {data} = await gameServices.post('/verify/task', payload);
            loadGameList();
            setModalVisible(true)
        } catch (error) {
            Alert.alert(I18n.t('game.invalid_task_password'));
            navigation.goBack();
        }
        setLoading(false)
    }

    const onCloseModal = () => {
        setModalVisible(false)
        navigation.navigate('GameDetail', {uis:uid, pass: true});
    }

    const cameraHeight = Dimensions.get('window').height - 80;

    return (
        <Style.QRCodeContainer>
            <QRCodeScanner
                cameraStyle={{height: cameraHeight}}
                onRead={onSuccess}
                topContent={null}
            />
            {
                isLoading ? <LoadingIcon size="large" color="#ffffff"/> : null
            }

            <ModalFinish visible={modalVisible} onClose={onCloseModal}/>
        </Style.QRCodeContainer>
    );
}

export default function (props) {
    const navigation = useNavigation();
    const uid = props.navigation.getParam('uid');
    return <QRCode {...props} navigation={navigation} uid={uid}/>
}
