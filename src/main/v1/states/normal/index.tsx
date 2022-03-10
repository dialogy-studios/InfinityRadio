import React, {useEffect, useRef, useState} from "react";
import {ActivityIndicator, Animated, ImageBackground, StatusBar, useWindowDimensions, View} from 'react-native';
import MainAppScreen from "../../MainAppScreen";
import MainContextProvider, {UiState, useSafeMainContext} from "../../config/MainContext";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import LoadingWithGif from "../../../../components/v1/loading";
import {ConfigContextProvider, useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";

const Content = () => {
    const context = useSafeMainContext()
    const config = useSafeConfigContext()
    const [shouldHideLoading, setShouldHideLoading] = useState(true)
    const normalUiOpacity = useRef(new Animated.Value(0)).current
    const loadingUiOpacity = useRef(new Animated.Value(1)).current
    const dimensions = useWindowDimensions()

    useEffect(() => {
        const uiState: UiState = context.state.ui
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
            .start()
    }, [context.state.ui])


    loadingUiOpacity.addListener(({value}) => {
        if (value == 0) {
            setShouldHideLoading(false)
        }
    })

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
                <LoadingWithGif />
            </Animated.View>
        </View>
    )
}

const Normal: React.FC<any> = () => {
    return (
        <MainContextProvider>
            <ConfigContextProvider>
                <Content />
            </ConfigContextProvider>
        </MainContextProvider>
    )
}

export default Normal;
