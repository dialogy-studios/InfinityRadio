import React from "react";
import {ImageBackground, StatusBar, Text, View} from 'react-native';
import MainAppScreen from "../MainAppScreen";
import remoteConfig from "@react-native-firebase/remote-config";

const Normal: React.FC<any> = () => {
    return (
        <ImageBackground
            style={[{flex: 1}]}
            source={{
                uri: remoteConfig().getValue('background').asString(),
            }}>
            <StatusBar barStyle={remoteConfig().getString('status_bar') as 'light-content' | 'dark-content'} translucent={true} backgroundColor={'transparent'}/>
            <MainAppScreen />
        </ImageBackground>
    )
}

export default Normal;
