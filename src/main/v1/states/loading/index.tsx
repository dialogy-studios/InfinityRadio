import React from "react";
import {ActivityIndicator, StatusBar, View} from "react-native";
import Centered from "../../../../resources/v1/styles/view/Centered";
import remoteConfig from "@react-native-firebase/remote-config";

const Loading: React.FC<any> = () => {
    return (
        <View
            style={[
                Centered,
                {
                    flex: 1
                }
            ]}
        >
            <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'}/>
            <ActivityIndicator
                size={"large"}
                color={"red"}
            />
        </View>
    )
}

export default Loading;
