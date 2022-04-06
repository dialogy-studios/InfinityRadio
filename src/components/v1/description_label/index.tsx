import {Text} from "react-native";
import React from "react";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

interface Props {
    size?: number
}

const DescriptionLabel: React.FC<Props> = ({size = 16}) => {
    const config = useSafeConfigContext()
    return (
        <Text style={{color: 'white', fontSize: size, opacity: .7}}>{config.state.playerLockScreen.description}</Text>
    )
}

export default DescriptionLabel
