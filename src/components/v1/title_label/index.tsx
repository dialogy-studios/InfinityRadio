import {Text} from "react-native";
import React from "react";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

interface Props {
    size?: number
}

const TitleLabel: React.FC<Props> = ({size = 24}) => {
    const config = useSafeConfigContext()
    return (
        <Text style={{color: 'white', fontSize: size}}>{config.state.playerLockScreen.artist}</Text>
    )
}

export default TitleLabel
