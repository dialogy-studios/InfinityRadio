/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
import Main from './src/main/v1/Main';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

AppRegistry.registerComponent(appName, () => Main);
