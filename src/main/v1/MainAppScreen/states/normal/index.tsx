import React from "react";
import MainContextProvider, {UiState, useSafeMainContext} from "../../../config/MainContext";
import {ConfigContextProvider} from "../../../../../firebase/v1/firestore/collection/configs";
import InternetConnectionErrorScreen from "../../../InternetConnectionErrorScreen";
import PlayerProvider from "../../../../../components/v1/player/config/Context";
import Player from "../../../../../components/v1/player";
import {NavigationContainer} from '@react-navigation/native';
import {AppDrawer, MainScreenStack} from "../../../../../navigation/drawer/v1";
import DrawerLayout from "../../../../../layout/drawer/v1";
import ShareScreen from "../../../ShareScreen";
import {ScreensNames} from "../../../../../navigation/drawer/v1/models";
import {ShareContextProvider} from "../../../../../domain/share";
import PlayerScreen from "../../../PlayerScreen";
import Toast from "react-native-toast-message";

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
                                drawerContent={DrawerLayout}
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
