import React from "react";
import Svg, {G, Path, Rect} from "react-native-svg";

interface Props {
    size?: number,
    color?: string
}

const ShareIcon : React.FC<Props> = ({size = 24, color = 'white'}) => {
    return (
        <Svg height={size} viewBox="0 0 24 24" width={size} fill={color}>
            <G>
                <Rect fill="none" height={size} width={size}/>
                </G>
                    <G>
                        <Path d="M16,5l-1.42,1.42l-1.59-1.59V16h-1.98V4.83L9.42,6.42L8,5l4-4L16,5z M20,10v11c0,1.1-0.9,2-2,2H6c-1.11,0-2-0.9-2-2V10 c0-1.11,0.89-2,2-2h3v2H6v11h12V10h-3V8h3C19.1,8,20,8.89,20,10z"/>
                    </G>
        </Svg>
    )
}

export default ShareIcon
