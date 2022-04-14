import React from "react";
import {StyleProp, Text, TextStyle, TouchableOpacity, View} from "react-native";

interface Props {
    onPress: () => void,
    icon: () => Element | null,
    label: string
}

const ShareButtonRenderer: React.FC<Props> = (props) => {

    const shareOptionTextStyle: StyleProp<TextStyle> = {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 14,
        marginTop: 0
    }

    return (
        <View

        >
            <TouchableOpacity
                style={[
                    {
                        marginVertical: 5,
                        alignItems: 'center'
                    }
                ]}
                onPress={props.onPress}
            >
                {props.icon()}
            </TouchableOpacity>
            <Text style={[
                shareOptionTextStyle
            ]}>{props.label}</Text>
        </View>
    )
}

export default ShareButtonRenderer
