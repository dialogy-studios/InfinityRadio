import React from "react";
import {Text, View} from 'react-native';
import Centered from "../../../../resources/v1/styles/view/Centered";

interface Props {
    message: string
}

const Error: React.FC<Props> = ({message}) => {
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
            <Text>
                Message: ${message}
            </Text>

        </View>
    )
}

export default Error;
