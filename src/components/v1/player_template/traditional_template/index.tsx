import TraditionalPlayerController from "../../player_controller/traditional";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {Animated, Dimensions, View} from "react-native";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import LiveLabel from "../../player_controller/traditional/livelabel";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import Logo from "../../../../header/v1/Logo";

interface Props {
}

interface TraditionalTemplateMethods {
    fade: (config: TimingAnimationConfig, autoStart: boolean) => Animated.CompositeAnimation | null
}

const DEFAULT_MARGIN_HORIZONTAL = 16

const TraditionalTemplate = forwardRef<TraditionalTemplateMethods, Props>((props, ref) => {
    const config = useSafeConfigContext()
    const opacity = useRef(new Animated.Value(1)).current

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
                // height: DeviceInfo.hasNotch() ? screenDimensions.height - 50 : screenDimensions.height - 40,
                // width: screenDimensions.width,
                // position: 'absolute',
                flex: 1,
                // justifyContent: 'space-around',
                // alignItems: 'center',
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
                        flex: 1,
                        marginHorizontal: DEFAULT_MARGIN_HORIZONTAL * 3,
                        flexDirection: "row"
                    }
                ]}
            >
                <View
                    style={[
                        {
                            flex: 1
                        }
                    ]}
                />
                <View
                    style={[
                        {
                            flex: 2
                        }
                    ]}
                >
                    <Logo/>
                </View>
                <View
                    style={[
                        {
                            flex: 1
                        }
                    ]}
                />
            </View>
            <View
                style={[
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: DEFAULT_MARGIN_HORIZONTAL / 2
                    }
                ]}
            >
                <View>
                    <LiveLabel isLive={config.state.mainScreen.isLive} variant={'dark'}/>
                </View>
            </View>
            <View
                style={[
                    {
                        flex: 8,
                        marginHorizontal: DEFAULT_MARGIN_HORIZONTAL,
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
