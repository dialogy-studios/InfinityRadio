import HeaderBasic from "../../../../header/v1/HeaderBasic";
import TraditionalPlayerController from "../../player_controller/traditional";
import SocialBottom from "../../../../bottom/socialBottom/v1";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {Animated, Dimensions, View} from "react-native";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import {useSafeWindowDimensions} from "../../dimensions/SafeDimensions";
import DeviceInfo from "react-native-device-info";

interface Props {}
interface TraditionalTemplateMethods {
    fade: (config: TimingAnimationConfig, autoStart: boolean) => Animated.CompositeAnimation | null
}

const TraditionalTemplate = forwardRef<TraditionalTemplateMethods, Props>((props, ref) => {
    const opacity = useRef(new Animated.Value(1)).current
    const screenDimensions = {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
    }

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
                height: DeviceInfo.hasNotch() ? screenDimensions.height - 50 : screenDimensions.height,
                width: screenDimensions.width,
                position: 'absolute',
                opacity,
                zIndex: opacity
                    .interpolate({
                        inputRange: [0, 1],
                        outputRange: [-999, 999]
                    })
            }]}
        >
            <View
                style={[
                    {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}
            >
                <HeaderBasic/>
            </View>
            <View
                style={[
                    {
                        flex: 1,
                        marginHorizontal: 16,
                        // backgroundColor: 'gray'
                    }
                ]}
            >
                <TraditionalPlayerController/>
            </View>
        </Animated.View>
    )
})

export default TraditionalTemplate
