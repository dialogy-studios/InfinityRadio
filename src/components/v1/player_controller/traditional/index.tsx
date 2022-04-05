import * as React from 'react';
import {View} from 'react-native';
import {useSafePlayer} from '../../player/config/Context';
import Slider from "@react-native-community/slider";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import Thumb from "../../thumb";
import PlayerLayout from "../../../../layout/player";

const TraditionalPlayerController: React.FC<any> = () => {
  const player = useSafePlayer();
  const config = useSafeConfigContext();

    return (
        <View
            style={[
                {
                    flex: 1
                }
            ]}
        >
            <View
                style={[
                    {
                        // backgroundColor: 'red',
                        flex: 3
                        // height: 300,
                    }
                ]}
            >
                <Thumb variant={"thumb-with-title-and-description"} />
            </View>
            <View
                style={[
                    {
                        // backgroundColor: 'purple',
                        flex: 1
                        // height: 125
                    }
                ]}
            >
                <View
                    style={[
                        {
                            // backgroundColor: 'green',
                            flex: 1
                        }
                    ]}
                >
                    <View
                        style={[
                            {
                                // paddingBottom: 20,
                                // backgroundColor: 'purple',
                                flexDirection: 'row'
                            }
                        ]}
                    >
                        <View
                            style={[
                                {
                                    flex: 1
                                }
                            ]}>
                            <Slider
                                minimumValue={0}
                                maximumValue={10}
                                value={player.state.muted ? 0 : player.state.volume}
                                onValueChange={(value) => player.actions.volume.updateVolume(value)}
                                minimumTrackTintColor={config.state.playerSlider.player_slider_minimum_track_color}
                                maximumTrackTintColor={config.state.playerSlider.player_slider_maximum_track_color}
                                thumbTintColor={config.state.playerSlider.player_slider_button_color}
                                tapToSeek={true}
                            />
                        </View>
                    </View>
                    <PlayerLayout />
                </View>
            </View>
        </View>
    );
};

export default TraditionalPlayerController;
