import { AppRegistry, UIManager, YellowBox } from 'react-native';
import App from './src/containers/App/App';
import messaging from "@react-native-firebase/messaging";

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state', 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// open layout animation option https://facebook.github.io/react-native/docs/layoutanimation.html
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('MOPCON', () => App);

// background notification handler
const unsubscriber = messaging().onMessage(async remoteMessage => {
  // display payload
  // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
});

// disable log
if(!__DEV__) {
  const noop = () => {}
  ['log', 'error', 'warn', 'assert'].forEach((key) => {
    console[key] = noop;
  })
}
