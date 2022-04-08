import React from "react";
import {StyleProp, TextStyle, Text} from "react-native";

interface Props {
    style?: StyleProp<TextStyle>
}

const DrawerLabel: React.FC<Props> = ({style, children}) => {
    return (
        <Text
            style={[
                {
                    fontSize: 18
                },
                style
            ]}
        >
            {children}
        </Text>
    )
}

export default DrawerLabel
