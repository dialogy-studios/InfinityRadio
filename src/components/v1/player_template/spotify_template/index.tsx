import {Animated, useWindowDimensions, View} from "react-native";
import React, {forwardRef, useImperativeHandle, useRef} from "react";

interface Props {}

export interface SpotifyTemplateMethods {
    fade: (config: Animated.TimingAnimationConfig, autoStart: boolean) => Animated.CompositeAnimation | null
}

const SpotifyTemplate = forwardRef<SpotifyTemplateMethods, Props>((props, ref) => {
    const dimensions = useWindowDimensions()
    const opacity = useRef(new Animated.Value(0)).current

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
                    height: dimensions.height,
                    width: dimensions.width,
                    opacity
                }
            ]}
        >
            <View
                style={[
                    {
                        flex: 1,
                        backgroundColor: 'red'
                    }
                ]}
            >
                <View
                    style={[
                        {
                            flex: 1,
                            flexDirection: 'row',
                            backgroundColor: 'pink',
                            alignItems: 'flex-end'
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                height: 50,
                                flex: 1,
                                backgroundColor: 'blue'
                            }
                        ]}
                    />

                </View>

            </View>
        </Animated.View>
    )
})

export default SpotifyTemplate
