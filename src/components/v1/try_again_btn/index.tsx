import Centered from "../../../resources/v1/styles/view/Centered";
import Retry from "../../../resources/v1/icons/Retry";
import {StyleProp, Text, TouchableOpacity, ViewStyle} from "react-native";
import React from "react";

interface Props {
    onCLick: () => void,
    style?: StyleProp<ViewStyle>
}

const TryAgainBtn: React.FC<Props> = ({onCLick, style}) => {
    return (
        <TouchableOpacity
            style={[
                style,
                {flexDirection: 'row'},
                Centered
            ]}
            onPress={onCLick}
        >
            <Retry color={'white'} />
            <Text style={[
                {color: 'white', paddingLeft: 5},
            ]} >Try Again!</Text>
        </TouchableOpacity>
    )
}

export default TryAgainBtn
