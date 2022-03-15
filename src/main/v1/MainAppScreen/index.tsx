import React from 'react';
import PlayerTemplateRenderer, {PlayerTemplate} from "../../../components/v1/player_template";
import {useSafePlayer} from "../../../components/v1/player/config/Context";
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableHighlight} from "react-native";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";

const MainAppScreen: React.FC<any> = () => {
    const player = useSafePlayer()
    const config = useSafeConfigContext()

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
            <TouchableHighlight
                onPress={updateTemplate}
            >
                <PlayerTemplateRenderer template={player.state.template}/>
            </TouchableHighlight>
        </SafeAreaView>
    );
};

export default MainAppScreen;
