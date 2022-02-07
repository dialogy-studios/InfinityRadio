import React, {useEffect, useRef, useState} from "react";
import {Animated, PanResponder, View} from "react-native";
import {Player} from "../../config/Context";
import FlexColumn from "../../../../../resources/v1/styles/view/FlexColumn";
import JustifyCenter from "../../../../../resources/v1/styles/view/JustifyCenter";
import AlignCenter from "../../../../../resources/v1/styles/view/AlignCenter";

interface Props {
    isVisible: boolean,
    player: Player
}

const VolumeSlider: React.FC<Props> = ({isVisible, player}) => {
    const [opacityValue, setOpacityValue] = useState(0);
    const [width, setWidth] = useState(0)
    const [dx, setDx] = useState<number | null>(null);
    const rootRef = useRef<View | null>();
    const opacity = useRef(new Animated.Value(1)).current;
    const sliderPosition = useRef(new Animated.ValueXY({x: player.state.volume * 8, y: 0})).current;

    const panResponder = React.useRef(
        PanResponder.create({
            // Ask to be the responder:
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
                true,
            onPanResponderGrant: () => {
                /*sliderPosition
                    .setOffset({
                        x: sliderPosition.x._value,
                        y: sliderPosition.y._value,
                    })*/
            },
            onPanResponderMove: (event, gestureState) => {
                setDx(gestureState.dx);
            },
            onPanResponderTerminationRequest: (evt, gestureState) =>
                true,
            onPanResponderRelease: (evt, gestureState) => {
                // The user has released all touches while this view is the
                // responder. This typically means a gesture has succeeded
                // sliderPosition.flattenOffset()
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // Another component has become the responder, so this gesture
                // should be cancelled
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // Returns whether this component should block native components from becoming the JS
                // responder. Returns true by default. Is currently only supported on android.
                return true;
            }
        })
    ).current;

    const fadeIn = () => {
        Animated
            .timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            })
            .start(() => {
                setOpacityValue(1)
            })

    }

    const fadeOut = () => {
        Animated
            .timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            })
            .start(() => {
                setOpacityValue(0)
            })
    }

    useEffect(() => {
        if (isVisible) {
            // fadeIn();
        } else if (opacityValue > 0) {
            // fadeOut();
        }
    }, [isVisible])

    useEffect(() => {
        if (dx) {
            player.actions.volume.increase(Math.round(Math.floor(dx)/5));
        }
    }, [dx])

    useEffect(() => {
        sliderPosition.x.setValue(
            (width/11)*player.state.volume
        )
    }, [player.state.volume, width])

    return (
        <Animated.View
            style={[
                FlexColumn,
                JustifyCenter,
                {
                    opacity,
                },

            ]}
        >
            <View
                ref={(ref) => rootRef.current = ref}
                onLayout={(event) => {
                    rootRef.current?.measure((x, y, width, height, pageX, pageY) => {
                        setWidth(width)
                    })
                }}
            >
                <View style={[
                    {
                        width: (width/10)*player.state.volume,
                        height: 10,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        position: "absolute"
                    }
                ]}/>
                <View style={[
                    {
                        width,
                        height: 10,
                        backgroundColor: 'white',
                        opacity: 0.3,
                        borderRadius: 20,
                        position: "absolute"
                    }
                ]}/>
                <Animated.View
                    style={[
                        {
                            height: 20,
                            width: 20,
                            backgroundColor: 'white',
                            borderRadius: 25,
                            position: 'absolute'
                        },
                        {
                            transform: [
                                {
                                    translateY: -5,
                                },
                                {
                                    translateX: sliderPosition.x
                                }
                            ]
                        }
                    ]}
                    {...panResponder.panHandlers}
                />
            </View>
        </Animated.View>
    )
}

export default VolumeSlider;
