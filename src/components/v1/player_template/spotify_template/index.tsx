import {Animated, Dimensions, View} from "react-native";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {useSafeWindowDimensions} from "../../dimensions/SafeDimensions";
import DeviceInfo from "react-native-device-info";
interface Props {}

export interface SpotifyTemplateMethods {
    fade: (config: Animated.TimingAnimationConfig, autoStart: boolean) => Animated.CompositeAnimation | null
}

const SpotifyTemplate = forwardRef<SpotifyTemplateMethods, Props>((props, ref) => {
    const opacity = useRef(new Animated.Value(0)).current
    const screenHeight = Dimensions.get('screen').height
    const screenWidth = Dimensions.get('screen').width
    useImperativeHandle(ref, () => ({
        fade: (config: Animated.TimingAnimationConfig, autoStart: boolean): Animated.CompositeAnimation | null => {
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
            style={[
                {
                    position: 'absolute',
                    height: DeviceInfo.hasNotch() ? screenHeight - 50 : screenHeight,
                    width: screenWidth,
                    opacity,
                    zIndex: opacity
                        .interpolate({
                            inputRange: [0, 1],
                            outputRange: [-999, 999]
                        })
                }
            ]}
        >
            <View
                style={[
                    {
                        flex: 1,
                    }
                ]}
            >
                <View
                    style={[
                        {
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-end'
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                height: 75,
                                flex: 1,
                                flexDirection: 'row',
                                // backgroundColor: 'white'
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    height: 40,
                                    width: 40,
                                    // backgroundColor: 'red',
                                    marginLeft: 10,
                                    marginTop: 10,
                                }
                            ]}
                        />
                        <View
                            style={[
                                {
                                    flex: 1,
                                    // backgroundColor: 'pink'
                                }
                            ]}
                        />
                        <View
                            style={[
                                {
                                    height: 40,
                                    width: 40,
                                    // backgroundColor: 'blue',
                                    marginRight: 10,
                                    marginTop: 10
                                }
                            ]}
                        />

                    </View>
                </View>
            </View>
        </Animated.View>
    )
})

export default SpotifyTemplate
