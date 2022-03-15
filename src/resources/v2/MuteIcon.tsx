import Svg, {Path} from "react-native-svg";
import React from "react";

interface Props {
    size?: number,
    color?: string
}

const MuteIcon: React.FC<Props> = ({size = 24, color = 'white'}) => {
    return (
        <Svg height={size} viewBox="0 0 24 24" width={size} fill={color}>
            <Path d="M0 0h24v24H0V0z" fill="none"/>
            <Path d="M14 8.83v6.34L11.83 13H9v-2h2.83L14 8.83M16 4l-5 5H7v6h4l5 5V4z"/>
        </Svg>
    )
}

export default MuteIcon
