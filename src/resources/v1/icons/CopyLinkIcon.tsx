import Svg, {G, Path} from "react-native-svg";
import React from "react";
import {pickOrDefault} from "../../../domain/nullables";
import {View} from "react-native";

type CopyLinkIconVariant = 'circle'

interface Props {
    size?: number,
    linkColor?: string,
    circleColor?: string,
    variant?: CopyLinkIconVariant
}

function parseProps(props: Props): Props {
    return (
        {
            size: pickOrDefault(props.size, 24),
            linkColor: pickOrDefault(props.linkColor, 'black'),
            circleColor: pickOrDefault(props.circleColor, 'white'),
            variant: pickOrDefault(props.variant, undefined)
        }
    )
}
const CopyLinkIcon: React.FC<Props> = (receivedProps) => {
    const props = parseProps(receivedProps)

    if (props.variant == "circle") {
        return (
            <View
                style={[
                    {
                        padding: 10,
                        backgroundColor: props.circleColor,
                        borderRadius: props.size
                    }
                ]}
            >
                <CopyLinkIcon {...props} variant={undefined}/>
            </View>
        )
    }

    return (
        <Svg
            viewBox="0 0 1000 1000"
            height={props.size}
            width={props.size}
        >
            <G>
                <Path
                    fill={props.linkColor}
                    d="M387.1,925.4c-86.1,86.1-226.3,86.1-312.5-0.1c-86.1-86.1-86.1-226.3,0-312.4l221.3-221.3c86.1-86.1,226.3-86.1,312.5,0.1c2.3,2.3,4.6,4.7,6.8,7.1c1.3,1.1,2.5,2.2,3.8,3.4c3.5,3.5,6.4,7.3,8.7,11.4c0.3,0.4,0.6,0.7,0.9,1.1c-0.1,0.1-0.1,0.1-0.2,0.1c10.6,20,7.5,45.4-9.4,62.2c-17,17-42.6,20-62.6,9.1c-1.4,1.5-15.3-12.3-22.6-19.7l-0.1-0.1c-45-45-117.6-45.3-162.6-0.4L149.4,687.7c-45,45-45,117.9,0,162.9l0.1,0.1c45,45,117.9,45,162.9,0l133.5-133.5c46.3,22.7,100.8,23.5,147.5,2L387.1,925.4L387.1,925.4L387.1,925.4z M925.4,387.1L704.1,608.4c-86.1,86.1-226.3,86.1-312.5-0.1c-2.3-2.3-4.6-4.7-6.8-7.1c-1.3-1.1-2.5-2.2-3.7-3.4c-3.5-3.5-6.4-7.3-8.7-11.4c-0.3-0.4-0.6-0.7-0.8-1.1c0,0,0.1-0.1,0.2-0.1c-10.6-20-7.5-45.4,9.4-62.2c17-17,42.6-20,62.6-9.1c1.4-1.5,15.3,12.4,22.6,19.7l0.1,0.1c45,45,117.6,45.4,162.5,0.4l221.7-221.7c45-45,45-117.9,0-162.9l0-0.1c-45-45-117.9-45-162.9,0L554.2,282.8c-46.2-22.6-100.8-23.5-147.5-2L612.9,74.6c86.1-86.1,226.3-86.1,312.5,0.1C1011.5,160.8,1011.5,301,925.4,387.1L925.4,387.1L925.4,387.1z"/>
            </G>
        </Svg>
    )
}

export default CopyLinkIcon
