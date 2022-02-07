import React, {useEffect, useRef} from "react";
import {Animated, Text, View} from "react-native";
import FlexRow from "../../../../resources/v1/styles/view/FlexRow";
import AlignCenter from "../../../../resources/v1/styles/view/AlignCenter";
import JustifyAround from "../../../../resources/v1/styles/view/JustifyAround";
import JustifyBetween from "../../../../resources/v1/styles/view/JustifyBetween";

interface Props {
    isLive: boolean
}

const LiveLabel: React.FC<Props> = ({isLive}) => {
    const opacity = useRef(new Animated.Value(1)).current

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

    return (
        <View
            style={[
                FlexRow,
                AlignCenter,
                JustifyBetween,
                {
                    marginTop: 15,
                    marginRight: 10,
                    height: 20,
                    width: 70,
                    // backgroundColor: 'white',
                    position: 'absolute',
                }
            ]}
        >
            <View
                style={[
                    FlexRow,
                    JustifyAround,
                    {
                        // backgroundColor: 'pink',
                    }
                ]}
            >
                <View
                    style={[
                        {
                            width: 70,
                            height: 20,
                            marginLeft: -5,
                            position: 'absolute',
                            backgroundColor: 'black',
                            borderRadius: 10,
                            opacity: .5
                        }
                    ]}
                />
                <Animated.View
                    style={[
                        {
                            height: 20,
                            width: 20,
                            borderRadius: 20,
                            backgroundColor: 'red',
                            shadowColor: 'black',
                            shadowOffset: {
                                width: -2,
                                height: 2
                            },
                            shadowRadius: 20,
                            shadowOpacity: 1
                        },
                        {
                            opacity
                        }
                    ]}
                />
                <Text
                    style={[
                        {
                            fontSize: 16,
                            color: 'white',
                            letterSpacing: 1
                        }
                    ]}
                >
                    LIVE
                </Text>
            </View>
        </View>
    )
}

export default LiveLabel;
