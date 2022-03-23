import Svg, {G, Path, Rect} from "react-native-svg";
import React from "react";

interface Props {
    size?: number,
    color?: string
}

const PauseIcon: React.FC<Props> = ({size = 24, color = 'white'}) => {
    return (
        <Svg enable-background="new 0 0 24 24" height={size} viewBox="0 0 24 24"
             width={size} fill={color}>
            <G>
                <Rect fill="none" height="" width="24"/>
                <Rect fill="none" height="24" width="24"/>
                <Rect fill="none" height="24" width="24"/>
            </G>
            <G>
                <G/>
                <Path
                    d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9V8h2V16z M15,16h-2V8h2V16z"/>
            </G>
        </Svg>
    )
}

export default PauseIcon
