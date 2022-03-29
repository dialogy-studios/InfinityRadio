import {Animated, Dimensions, ImageBackground, View} from "react-native";
import LoadingAnimated from "../../../components/v1/loading_animated";
import MainAppScreen from "../MainAppScreen";
import React, {useEffect, useRef} from "react";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import {UiState, useSafeMainContext} from "../config/MainContext";
import TimingAnimationConfig = Animated.TimingAnimationConfig;

const PlayerScreen = () => {
    const config = useSafeConfigContext()
    const mainContext = useSafeMainContext()
    const normalUiOpacity = useRef(new Animated.Value(0)).current
    const loadingUiOpacity = useRef(new Animated.Value(1)).current

    const handleAnimationBasedOnState = (currentState: UiState) => {
        if (currentState == UiState.ERROR) return
        const uiState: UiState = currentState
        var loadingAnimationConfig: TimingAnimationConfig = {
            useNativeDriver: true,
            toValue: 0,
            duration: 500
        }
        var normalAnimationConfig: TimingAnimationConfig = {
            useNativeDriver: true,
            toValue: 0,
            duration: 500
        }
        var loadingAnimation, normalAnimation
        if (uiState == UiState.LOADING) {
            loadingAnimationConfig.toValue = 1
            normalAnimationConfig.toValue = 0
        } else {
            loadingAnimationConfig.toValue = 0
            normalAnimationConfig.toValue = 1
        }

        loadingAnimation = Animated
            .timing(
                loadingUiOpacity,
                loadingAnimationConfig
            )
        normalAnimation = Animated
            .timing(
                normalUiOpacity,
                normalAnimationConfig
            )

        Animated
            .sequence(
                [
                    loadingAnimation,
                    normalAnimation
                ]
            )
            .start(() => {})
    }

    useEffect(() => {
        handleAnimationBasedOnState(mainContext.state.ui)
    }, [mainContext.state.ui])

    const renderLoading = () => {
        return (
            <Animated.View
                style={[{
                    opacity: loadingUiOpacity,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}
            >
                <LoadingAnimated />
            </Animated.View>
        )
    }

    const renderNormal = () => {
        return (
            <Animated.View
                style={[{
                    height: Dimensions.get('screen').height,
                    width: Dimensions.get('screen').width,
                    position: 'absolute',
                    opacity: normalUiOpacity
                }]}>
                <ImageBackground
                    style={[
                        {
                            flex: 1,
                        }
                    ]}
                    source={{uri: config.state.mainScreen.background}}
                >
                    <MainAppScreen />
                </ImageBackground>
            </Animated.View>
        )
    }

    return (
        <View
            style={[{flex: 1, backgroundColor: 'black'}]}
        >
            {renderLoading()}
            {renderNormal()}
        </View>
    )
}

export default PlayerScreen
