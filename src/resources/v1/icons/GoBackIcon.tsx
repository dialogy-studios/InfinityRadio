import React from "react";
import Svg, {Path} from "react-native-svg";
import {Platform} from "react-native";

interface Props {
    size?: number,
    color?: string
}

const GoBackIcon: React.FC<Props> = ({size = 24, color = 'white'}) => {
    const getAndroidIcon = () => {
        return (
            <Svg height={size} viewBox="0 0 24 24" width={size} fill={color}>
                <Path d="M0 0h24v24H0V0z" fill="none"/>
                <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </Svg>
        )
    }

    const getIOSIcon = () => {
        return (
            <Svg height={size} viewBox="0 0 24 24" width={size} fill={color}>
                <Path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/>
                <Path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>
            </Svg>
        )
    }

    if (Platform.OS == 'ios') {
        return getIOSIcon()
    } else {
        return getAndroidIcon()
    }
}

export default GoBackIcon
