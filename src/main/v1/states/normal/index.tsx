import React, {useEffect, useRef} from "react";
import {Animated, Dimensions, ImageBackground, View, Text} from 'react-native';
import MainContextProvider, {UiState, useSafeMainContext} from "../../config/MainContext";
import {ConfigContextProvider, useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import InternetConnectionErrorScreen from "../../InternetConnectionErrorScreen";
import LoadingAnimated from "../../../../components/v1/loading_animated";
import PlayerProvider from "../../../../components/v1/player/config/Context";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import MainAppScreen from "../../MainAppScreen";
import Player from "../../../../components/v1/player";
import { NavigationContainer } from '@react-navigation/native';
import {AppDrawer} from "../../../../navigation/drawer/v1";
import Drawer from "../../../../components/v1/drawer/v1";

const Content: React.FC<any> = () => {
    const mainContext = useSafeMainContext()
    const config = useSafeConfigContext()
    const normalUiOpacity = useRef(new Animated.Value(0)).current
    const loadingUiOpacity = useRef(new Animated.Value(1)).current

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
            .start(() => {})
    }

    useEffect(() => {
        handleAnimationBasedOnState(mainContext.state.ui)
    }, [mainContext.state.ui])

    if (mainContext.state.ui == UiState.ERROR) {
        return (
            <InternetConnectionErrorScreen
                message={"Error on load stream."}
                retryAction={retryAction}
            />
        )
    }

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

const Normal: React.FC<any> = () => {
    return (
        <NavigationContainer>
            <MainContextProvider>
                <ConfigContextProvider>
                    <PlayerProvider>
                        <Player />
                        <AppDrawer.Navigator
                            screenOptions={{header: () => null}}
                            drawerContent={Drawer}
                        >
                            <AppDrawer.Screen name={"Main"} component={Content} />
                        </AppDrawer.Navigator>
                    </PlayerProvider>
                </ConfigContextProvider>
            </MainContextProvider>
        </NavigationContainer>
    )
}

export default Normal;
