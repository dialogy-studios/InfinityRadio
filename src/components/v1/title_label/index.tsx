import {Text} from "react-native";
import React from "react";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

const TitleLabel: React.FC<any> = () => {
    const config = useSafeConfigContext()
    return (
        <Text style={{color: 'white', fontSize: 24}}>{config.state.playerLockScreen.artist}</Text>
    )
}

export default TitleLabel
