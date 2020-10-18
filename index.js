import { AppRegistry, UIManager, YellowBox } from 'react-native';
import App from './src/containers/App/App';

YellowBox.ignoreWarnings(['Non-serializable values were found in the navigation state', 'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// open layout animation option https://facebook.github.io/react-native/docs/layoutanimation.html
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('MOPCON', () => App);

// disable log
if(!__DEV__) {
  const noop = () => {}
  ['log', 'error', 'warn', 'assert'].forEach((key) => {
    console[key] = noop;
  })
}
