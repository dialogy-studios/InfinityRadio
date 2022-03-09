import Centered from "../../../resources/v1/styles/view/Centered";
import Retry from "../../../resources/v1/icons/Retry";
import {Text, TouchableOpacity} from "react-native";
import React from "react";

interface Props {
    onCLick: () => void
}

const TryAgainBtn: React.FC<Props> = ({onCLick}) => {
    return (
        <TouchableOpacity
            style={[
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
