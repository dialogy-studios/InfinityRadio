import * as React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {useSafePlayer} from '../../player/config/Context';
import Slider from "@react-native-community/slider";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import PlayIcon from '../../../../resources/v2/PlayIcon';
import VolumeDownIcon from "../../../../resources/v1/icons/VolumeDownIcon";
import VolumeUpIcon from "../../../../resources/v1/icons/VolumeUpIcon";
import PauseIcon from "../../../../resources/v2/PauseIcon";

const TraditionalPlayerController = () => {
  const player = useSafePlayer();
  const config = useSafeConfigContext();

    return (
        <>
            <View
                style={[
                    {
                        // backgroundColor: 'red',
                        flex: 1.5
                    }
                ]}
            >
                <Image
                    style={{
                        flex: 1
                    }}
                    source={{uri: config.state.mainScreen.player_poster}}
                />
            </View>
            <View
                style={[
                    {
                        // backgroundColor: 'black',
                        flex: 1
                    }
                ]}
            >

                <View
                    style={[
                        {
                            paddingVertical: 25,
                            // backgroundColor: 'gray'
                        }
                    ]}
                >
                    <Text style={{color: 'white', fontSize: 24}}>{config.state.playerLockScreen.artist}</Text>
                    <Text style={{color: 'white', fontSize: 16, opacity: .5}}>{config.state.playerLockScreen.description}</Text>
                </View>
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
                        <View style={[{flex: 1}]}>
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
                    <View
                        style={[
                            {
                                flexDirection: 'row',
                                // backgroundColor: 'red',
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <TouchableOpacity
                            onPress={player.actions.volume.decrease}
                        >
                            <VolumeDownIcon
                                size={48}
                                color={'white'}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={player.actions.play}
                        >
                            {
                                player.state.paused ?
                                    (
                                        <TouchableOpacity
                                            onPress={player.actions.play}
                                        >
                                            <PlayIcon
                                                size={72}
                                                color={'white'}
                                            />
                                        </TouchableOpacity>
                                    ) :
                                    (
                                        <TouchableOpacity
                                            onPress={player.actions.pause}
                                        >
                                            <PauseIcon
                                                size={72}
                                                color={'white'}
                                            />
                                        </TouchableOpacity>
                                    )
                            }

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={player.actions.volume.increase}
                        >
                            <VolumeUpIcon
                                size={48}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

export default TraditionalPlayerController;
