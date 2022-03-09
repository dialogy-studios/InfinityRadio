import React from "react";
import {ActivityIndicator, Image, StatusBar, View} from "react-native";
import Centered from "../../../../resources/v1/styles/view/Centered";
import LoadingWithGif from "../../../../components/v1/loading";

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
            <LoadingWithGif />
        </View>
    )
}

export default Loading;
