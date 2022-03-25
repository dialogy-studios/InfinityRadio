import React from 'react';
import PlayerTemplateRenderer, {PlayerTemplate} from "../../../components/v1/player_template";
import {useSafePlayer} from "../../../components/v1/player/config/Context";
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import {Dimensions, ScrollView, TouchableOpacity, View} from "react-native";
import MenuIcon from "../../../resources/v1/icons/MenuIcon";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {useNavigation} from "@react-navigation/native";
import DeviceInfo from "react-native-device-info";

const MainAppScreen: React.FC<any> = () => {
    const player = useSafePlayer()
    const config = useSafeConfigContext()
    const drawer: DrawerNavigationProp<any, any> = useNavigation()

    const updateTemplate = () => {
        if (!config.state.mainScreen.animate) return
        const stateUpdater: {[currentTemplate: number]: PlayerTemplate} = {
            [PlayerTemplate.TRADITIONAL]: PlayerTemplate.SPOTIFY,
            [PlayerTemplate.SPOTIFY]: PlayerTemplate.TRADITIONAL
        }
        const newTemplate = stateUpdater[player.state.template]
        player.actions.updateTemplate(newTemplate)
    }

    return (
        <SafeAreaView
            style={[
                {
                    flex: 1,
                }
            ]}
        >
            <View
                style={[
                    {
                        marginHorizontal: 16,
                        marginTop: DeviceInfo.hasNotch() ? 60 : 40,
                        position: 'absolute',
                        zIndex: 999
                    }
                ]}
            >
                <TouchableOpacity
                    style={[{zIndex: 999}]}
                    onPress={() => drawer.openDrawer()}
                >
                    <MenuIcon size={36} />
                </TouchableOpacity>
            </View>
            <ScrollView
            >
                <View
                    style={[{
                        height: Dimensions.get('screen').height - 100,
                        width: Dimensions.get('screen').width,
                    }]}
                >
                    <PlayerTemplateRenderer template={player.state.template}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainAppScreen;
