import {Text} from "react-native";
import React from "react";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

const DescriptionLabel: React.FC<any> = () => {
    const config = useSafeConfigContext()
    return (
        <Text style={{color: 'white', fontSize: 16, opacity: .5}}>{config.state.playerLockScreen.description}</Text>
    )
}

export default DescriptionLabel
