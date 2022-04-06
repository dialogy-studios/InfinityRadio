import React, {useEffect, useRef} from "react";
import {Animated, StyleProp, View, ViewStyle} from "react-native";

interface Props {

}

const Dots: React.FC<Props> = () => {
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
        height: 5,
        width: 5,
        margin: 10,
        backgroundColor: 'white'
    }

    const circleInterpolator = {
        input: [0, .2, .4, .6, .8, 1]
    }

    return (
        <View style={[
            {
                marginTop: 10,
                flexDirection: 'row',
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
    )
}

export default Dots
