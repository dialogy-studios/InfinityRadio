import React from "react";
import {Text, View} from 'react-native';
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
            <Text>
                Error on initialize app
            </Text>

        </View>
    )
}

export default Error;
