import {Animated, Dimensions, Image, ImageBackground, StatusBar, StyleProp, View, ViewStyle} from "react-native";
import React, {useEffect, useRef} from "react";
import Centered from "../../../resources/v1/styles/view/Centered";

const LoadingAnimated: React.FC<any> = () => {
    const opacity = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(opacity, {
                useNativeDriver: true,
                toValue: 1,
                duration: 3000,
            })
        )
            .start()
    }, [])

    const circle: StyleProp<ViewStyle> = {
        height: 10,
        width: 10,
        margin: 10,
        // borderRadius: 25,
        backgroundColor: 'white'
    }

    const circleInterpolator = {
        input: [0, .2, .4, .6, .8, 1]
    }

    return (
        <ImageBackground
            style={[
                {
                    flex: 1
                },
                Centered
            ]}
            source={require('../../../resources/v1/images/v1/background/background-1.jpg')}
        >
            <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
            <View
                style={[{
                    // backgroundColor: 'blue'
                }]}
            >
                <Image
                    source={require('../../../resources/v1/images/v1/loading/loading.png')}
                    style={[
                        {
                            // backgroundColor: 'brown',
                            maxWidth: Dimensions.get('window').width - 200,
                            justifyContent: 'flex-start',
                        }
                    ]}
                    resizeMode={"contain"}
                />
            </View>
            <View
                style={[{
                    marginTop: -100,
                    flexDirection: 'row',
                    // backgroundColor: 'red'
                }]}
            >
                <View style={[
                    {
                        flex: 1,
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center'
                    },
                ]}>
                    <Animated.View
                        style={[
                            circle,
                            {
                                opacity: opacity.interpolate({
                                    inputRange: circleInterpolator.input,
                                    outputRange: [1, 0, 0, 0, 0, 0],
                                })
                            }
                        ]}
                    />
                    <Animated.View
                        style={[
                            circle,
                            {
                                marginHorizontal: 50,
                                opacity: opacity.interpolate({
                                    inputRange: circleInterpolator.input,
                                    outputRange: [0, 0, 1, 0, 0, 0]
                                })
                            }
                        ]}
                    />
                    <Animated.View
                        style={[
                            circle,
                            {
                                opacity: opacity.interpolate({
                                    inputRange: circleInterpolator.input,
                                    outputRange: [0, 0, 0, 0, 1, 0],
                                    extrapolateRight: "extend"
                                })
                            }
                        ]}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

export default LoadingAnimated;
