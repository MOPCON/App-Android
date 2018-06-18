import React from 'react';
import { AppRegistry, UIManager, YellowBox } from 'react-native';
import App from './src/containers/App/App';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

// open layout animation option https://facebook.github.io/react-native/docs/layoutanimation.html
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('mopcon_android_app_2018', () => App);
