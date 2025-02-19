/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Import this for React Navigation gesture handling
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
