import { AppRegistry, UIManager, YellowBox } from 'react-native';
import App from './src/containers/App/App';
import messaging from "@react-native-firebase/messaging";
import PushNotification from 'react-native-push-notification'

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state', 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// open layout animation option https://facebook.github.io/react-native/docs/layoutanimation.html
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('MOPCON', () => App);

// foreground notification handler
messaging().onMessage(async remoteMessage => {
  // display payload
  console.log('Message handled in the foreground!', remoteMessage);
  const { notification = {} } = remoteMessage;

  PushNotification.localNotification({
    title: notification.title,
    message: notification.body,
  });
});

// background notification handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

// disable log
if(!__DEV__) {
  const noop = () => {}
  ['log', 'error', 'warn', 'assert'].forEach((key) => {
    console[key] = noop;
  })
}
