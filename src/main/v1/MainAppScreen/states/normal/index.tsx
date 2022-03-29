import React, {useEffect, useRef} from "react";
import {Animated} from 'react-native';
import MainContextProvider, {UiState, useSafeMainContext} from "../../../config/MainContext";
import {ConfigContextProvider, useSafeConfigContext} from "../../../../../firebase/v1/firestore/collection/configs";
import InternetConnectionErrorScreen from "../../../InternetConnectionErrorScreen";
import PlayerProvider from "../../../../../components/v1/player/config/Context";
import Player from "../../../../../components/v1/player";
import {NavigationContainer} from '@react-navigation/native';
import {AppDrawer, MainScreenStack} from "../../../../../navigation/drawer/v1";
import Drawer from "../../../../../components/v1/drawer/v1";
import ShareScreen from "../../../ShareScreen";
import {ScreensNames} from "../../../../../navigation/drawer/v1/models";
import {ShareContextProvider} from "../../../../../domain/share";
import Main from "../../../Main";
import MainAppScreen from "../../../PlayerScreen";
import PlayerScreen from "../../../PlayerScreen";

const Content: React.FC<any> = () => {
    const mainContext = useSafeMainContext()

    const retryAction = () => {
        mainContext.methods.updateUiState(UiState.LOADING)
    }

    if (mainContext.state.ui == UiState.ERROR) {
        return (
            <InternetConnectionErrorScreen
                message={"Error on load stream."}
                retryAction={retryAction}
            />
        )
    }

    // return <PlayerScreen />

    return (
        <MainScreenStack.Navigator
            initialRouteName={ScreensNames.MAIN_SCREEN}
            screenOptions={{
                header: () => null
            }}
        >
            <MainScreenStack.Screen
                name={ScreensNames.MAIN_SCREEN}
                component={PlayerScreen}
            />
            <MainScreenStack.Screen
                name={ScreensNames.SHARE}
                component={ShareScreen}
            />
        </MainScreenStack.Navigator>
    )
}

const Normal: React.FC<any> = () => {
    return (
        <NavigationContainer>
            <MainContextProvider>
                <ConfigContextProvider>
                    <ShareContextProvider>
                        <PlayerProvider>
                            <Player />
                            <AppDrawer.Navigator
                                screenOptions={{header: () => null}}
                                drawerContent={Drawer}
                            >
                                <AppDrawer.Screen name={ScreensNames.MAIN} component={Content} />
                            </AppDrawer.Navigator>
                        </PlayerProvider>
                    </ShareContextProvider>
                </ConfigContextProvider>
            </MainContextProvider>
        </NavigationContainer>
    )
}

export default Normal;
