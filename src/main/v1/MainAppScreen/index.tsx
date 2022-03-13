import {SafeAreaView, TouchableWithoutFeedback, View} from 'react-native';
import React from 'react';
import PlayerTemplateRenderer, {PlayerTemplate} from "../../../components/v1/player_template";
import {useSafePlayer} from "../../../components/v1/player/config/Context";

const MainAppScreen: React.FC<any> = () => {
    const player = useSafePlayer()

    const updateTemplate = () => {
        const stateUpdater: {[currentTemplate: number]: PlayerTemplate} = {
            [PlayerTemplate.TRADITIONAL]: PlayerTemplate.SPOTIFY,
            [PlayerTemplate.SPOTIFY]: PlayerTemplate.TRADITIONAL
        }
        const newTemplate = stateUpdater[player.state.template]
        player.actions.updateTemplate(newTemplate)
    }

    return (
        <SafeAreaView
            style={
                [
                    {
                        flex: 1
                    }
                ]
            }
        >
            <TouchableWithoutFeedback
                style={[{
                    flex: 1,
                    zIndex: -999
                }]}
                onPress={updateTemplate}
            >
                <View
                    style={[
                        {
                            flex: 1
                        }
                    ]}
                >
                    <PlayerTemplateRenderer template={player.state.template} />
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default MainAppScreen;
