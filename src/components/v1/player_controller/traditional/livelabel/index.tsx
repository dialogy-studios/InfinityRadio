import React, {useEffect, useRef} from "react";
import {Animated, Text, View} from "react-native";

interface Props {
    variant: 'light' | 'dark',
    isLive: boolean
}

const LiveLabel: React.FC<Props> = ({isLive, variant}) => {
    const opacity = useRef(new Animated.Value(1)).current

    const isDark = variant == 'dark'

    const startFadeAnimation = (targetOpacity: number) => {
        Animated
            .timing(opacity, {
                toValue: targetOpacity,
                duration: 1000,
                useNativeDriver: true
            })
            .start(() => {
                startFadeAnimation(targetOpacity == 0 ? 1 : 0)
            })
    }

    useEffect(() => {
        startFadeAnimation(0)
    }, [])



    if (isLive) {
        return (
            <View
                style={[
                    {
                        paddingVertical: 5,
                        borderRadius: 15,
                        opacity: .5,
                        flexDirection: 'row',
                        backgroundColor: isDark ? 'white' : 'black'
                    }
                ]}
            >
                <Animated.View
                    style={[
                        {
                            height: 15,
                            width: 15,
                            borderRadius: 15,
                            marginHorizontal: 10,
                            backgroundColor: 'red',
                            opacity
                        }
                    ]}
                >

                </Animated.View>
                <View
                    style={[
                        {
                            marginRight: 10
                        }
                    ]}
                >
                    <Text
                        style={[
                            {
                                color: isDark ? 'black' : 'white'
                            }
                        ]}
                    >
                        LIVE
                    </Text>
                </View>
            </View>
        )
    } else {
        return null
    }
}

export default LiveLabel;
