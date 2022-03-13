import React, {useEffect, useRef, useState} from "react";
import {Animated, ImageBackground, StatusBar, useWindowDimensions, View} from 'react-native';
import MainAppScreen from "../../MainAppScreen";
import MainContextProvider, {UiState, useSafeMainContext} from "../../config/MainContext";
import {ConfigContextProvider, useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import InternetConnectionErrorScreen from "../../InternetConnectionErrorScreen";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import LoadingAnimated from "../../../../components/v1/loading_animated";
import Player from "../../../../components/v1/player";
import PlayerProvider from "../../../../components/v1/player/config/Context";

const Content = () => {
    const mainContext = useSafeMainContext()
    const config = useSafeConfigContext()
    const [shouldHideLoading, setShouldHideLoading] = useState(true)
    const normalUiOpacity = useRef(new Animated.Value(0)).current
    const loadingUiOpacity = useRef(new Animated.Value(1)).current
    const dimensions = useWindowDimensions()

    const retryAction = () => {
        mainContext.methods.updateUiState(UiState.LOADING)
    }

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
            .start(() => {
            })
    }

    useEffect(() => {
        handleAnimationBasedOnState(mainContext.state.ui)
    }, [mainContext.state.ui])


    loadingUiOpacity.addListener(({value}) => {
        if (value == 0) {
            setShouldHideLoading(false)
        }
    })

    if (mainContext.state.ui == UiState.ERROR) {
        return (
            <InternetConnectionErrorScreen
                message={"Error on load stream."}
                retryAction={retryAction}
            />
        )
    }

    return (
        <View
            style={[{
                flex: 1,
                backgroundColor: 'black'
            }]}>
            <Animated.View
                style={[{
                    flex: 1,
                    opacity: normalUiOpacity
                }]}
            >
                <ImageBackground
                    style={[{
                        flex: 1,
                    }]}
                    source={{
                        uri: config.state.mainScreen.background,
                    }}>
                    <StatusBar barStyle={config.state.general.status_bar} translucent={true} backgroundColor={'transparent'}/>
                    <MainAppScreen />
                </ImageBackground>
            </Animated.View>
            <Animated.View
                style={[{
                    opacity: loadingUiOpacity,
                    width: dimensions.width,
                    height: dimensions.height,
                    display: shouldHideLoading ? 'flex' : 'none',
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}
            >
                <LoadingAnimated />
            </Animated.View>
        </View>
    )
}

const Normal: React.FC<any> = () => {
    return (
        <MainContextProvider>
            <ConfigContextProvider>
                <PlayerProvider>
                    <Player />
                    <Content />
                </PlayerProvider>
            </ConfigContextProvider>
        </MainContextProvider>
    )
}

export default Normal;
