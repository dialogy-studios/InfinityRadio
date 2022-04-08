import Svg, {Path} from "react-native-svg";
import React from "react";
import {pickOrDefault} from "../../../domain/nullables";
import {View} from "react-native";

type MoreIconVariant = 'circle'

interface Props {
    size?: number,
    dotColor?: string,
    circleColor?: string,
    variant?: MoreIconVariant
}

function parseProps(props: Props): Props {
    return (
        {
            size: pickOrDefault(props.size, 24),
            dotColor: pickOrDefault(props.dotColor, 'black'),
            circleColor: pickOrDefault(props.circleColor, 'white'),
            variant: pickOrDefault(props.variant, undefined),
        }
    )
}

const MoreIcon: React.FC<Props> = (receivedProps) => {
    const props = parseProps(receivedProps)

    if (props.variant == 'circle') {
        return (
            <View
                style={[
                    {
                        padding: 3,
                        borderRadius: props.size,
                        backgroundColor: props.circleColor
                    }
                ]}
            >
                <MoreIcon {...props} variant={undefined} />
            </View>
        )
    }

    return (
        <Svg
            height={props.size}
            viewBox="0 0 24 24"
            width={props.size}
            fill={props.dotColor}
        >
            <Path d="M0 0h24v24H0V0z"
                  fill={'none'} />
            <Path
                fill={props.dotColor}
                d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </Svg>
    )
}

export default MoreIcon
