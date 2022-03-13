import HeaderBasic from "../../../../header/v1/HeaderBasic";
import TraditionalPlayerController from "../../player_controller/traditional";
import SocialBottom from "../../../../bottom/socialBottom/v1";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {Animated, useWindowDimensions} from "react-native";
import TimingAnimationConfig = Animated.TimingAnimationConfig;

interface Props {}
interface TraditionalTemplateMethods {
    fade: (config: TimingAnimationConfig, autoStart: boolean) => Animated.CompositeAnimation | null
}

const TraditionalTemplate = forwardRef<TraditionalTemplateMethods, Props>((props, ref) => {
    const opacity = useRef(new Animated.Value(0)).current
    const dimensions = useWindowDimensions()

    useImperativeHandle(ref, () => ({
        fade: (config: TimingAnimationConfig, autoStart: boolean): Animated.CompositeAnimation | null => {
            const animation = Animated
                .timing(opacity, config)
            if (autoStart) {
                animation.start()
                return null
            } else {
                return animation
            }
        }
    }))

    return (
        <Animated.View
            style={[{
                height: dimensions.height,
                width: dimensions.width,
                position: "absolute",
                opacity
            }]}
        >
            <HeaderBasic/>
            <TraditionalPlayerController/>
            <SocialBottom/>
        </Animated.View>
    )
})

export default TraditionalTemplate
