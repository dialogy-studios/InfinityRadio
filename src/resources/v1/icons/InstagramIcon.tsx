import Svg, {Path} from "react-native-svg";
import React from "react";
import {View} from "react-native";
import {pickOrDefault} from "../../../domain/nullables";

type InstagramIconVariants = 'plain' | 'circle'

interface Props {
    size?: number,
    logoColor?: string,
    circleColor?: string,
    variant?: InstagramIconVariants
}

function parseProps(props: Props): Props {
    return (
        {
            variant: pickOrDefault(props.variant, undefined),
            size:  pickOrDefault(props.size, 24),
            logoColor: pickOrDefault(props.logoColor, "white"),
            circleColor: pickOrDefault(props.circleColor, "black")
        }
    )
}

const InstagramIcon: React.FC<Props> = (receivedProps ) => {
    const props = parseProps(receivedProps)

    if (props.variant == "circle") {
        return (
            <View
                style={[
                    {
                        padding: 3,
                        borderRadius: props.size,
                        backgroundColor: props.circleColor,
                        width: props.size,
                        height: props.size
                    }
                ]}
            >
                <InstagramIcon {...props} variant={undefined} />
            </View>
        )
    }

    return (
        <Svg height={props.size} width={props.size} viewBox="0 0 140 145">
            <Path
                fill={props.logoColor}
                d="M83,23a22,22,0,0,1,22,22V83a22,22,0,0,1-22,22H45A22,22,0,0,1,23,83V45A22,22,0,0,1,45,23H83m0-8H45A30.09,30.09,0,0,0,15,45V83a30.09,30.09,0,0,0,30,30H83a30.09,30.09,0,0,0,30-30V45A30.09,30.09,0,0,0,83,15Z"/>
            <Path
                fill={props.logoColor}
                d="M90.14,32a5.73,5.73,0,1,0,5.73,5.73A5.73,5.73,0,0,0,90.14,32Z"/>
            <Path
                fill={props.logoColor}
                d="M64.27,46.47A17.68,17.68,0,1,1,46.6,64.14,17.7,17.7,0,0,1,64.27,46.47m0-8A25.68,25.68,0,1,0,90,64.14,25.68,25.68,0,0,0,64.27,38.47Z"/>
        </Svg>
    )
}

export default InstagramIcon
