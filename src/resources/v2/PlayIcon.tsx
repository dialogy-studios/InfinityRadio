import Svg, {Path} from "react-native-svg";
import React from "react";

interface Props {
    size?: number,
    color?: string
}

const PlayIcon: React.FC<Props> = ({size = 24, color = 'white'}) => {
    return (
        <Svg height={size} viewBox="0 0 24 24" width={size} fill={color}>
            <Path d="M0 0h24v24H0V0z" fill="none"/>
            <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </Svg>
    )
}

export default PlayIcon
