import Svg, {Circle, Path} from "react-native-svg";
import React from "react";

interface Props {
    size?: number
}

const MoreIcon: React.FC<Props> = ({size}) => {
    return (
        <Svg height={size} viewBox="0 0 24 24" width={size} fill="#000000">
            <Path d="M0 0h24v24H0V0z" fill="none"/>
            <Path
                d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.97.89 1.66.89H22c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14z"/>
            <Circle cx="9" cy="12" r="1.5"/>
            <Circle cx="14" cy="12" r="1.5"/>
            <Circle cx="19" cy="12" r="1.5"/>
        </Svg>
    )
}

export default MoreIcon
