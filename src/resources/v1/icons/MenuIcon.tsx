import Svg, {Path} from "react-native-svg";
import React from "react";

interface Props {
    size?: number,
    color?: string
}

const MenuIcon: React.FC<Props> = ({size = 24, color = 'white'}) => {
    return (
        <Svg height={size} viewBox="0 0 24 24" width={size} fill={color}>
            <Path d="M0 0h24v24H0V0z" fill="none"/>
            <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </Svg>
    )
}

export default MenuIcon
