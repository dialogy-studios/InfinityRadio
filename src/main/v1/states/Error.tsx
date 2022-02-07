import React from "react";
import {ActivityIndicator, View} from "react-native";
import Centered from "../../../resources/v1/styles/view/Centered";

const Error: React.FC<any> = () => {
    return (
        <View
            style={[
                Centered,
    {
        flex: 1
    }
]}
>
    <ActivityIndicator size={32} />
    </View>
)
}

export default Loading;
