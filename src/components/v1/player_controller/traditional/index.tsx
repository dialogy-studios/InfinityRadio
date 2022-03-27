import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import {useSafePlayer} from '../../player/config/Context';
import Slider from "@react-native-community/slider";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import PlayIcon from '../../../../resources/v2/PlayIcon';
import VolumeDownIcon from "../../../../resources/v1/icons/VolumeDownIcon";
import VolumeUpIcon from "../../../../resources/v1/icons/VolumeUpIcon";
import PauseIcon from "../../../../resources/v2/PauseIcon";
import MuteIcon from "../../../../resources/v2/MuteIcon";
import ShareIcon from "../../../../resources/v2/ShareIcon";
import Thumb from "../../thumb";
import {ScreensNames} from "../../../../navigation/drawer/v1/models";
import {useNavigation} from "@react-navigation/native";

const TraditionalPlayerController: React.FC<any> = () => {
  const player = useSafePlayer();
  const config = useSafeConfigContext();
  const navigation = useNavigation()

    const goToShareScreen = () => {
        navigation.navigate(ScreensNames.SHARE)
    }

    return (
        <>
            <View
                style={[
                    {
                        // backgroundColor: 'red',
                        flex: 3
                    }
                ]}
            >
                <Thumb variant={"thumb-with-title-and-description"} />
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
                                alignItems: 'center'
                            }
                        ]}
                    >
                        <View style={[{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                        }]}>
                            <TouchableOpacity
                                // onPress={share.sharePlayerPoster}
                                onPress={goToShareScreen}
                            >
                                <ShareIcon />
                            </TouchableOpacity>

                            <TouchableOpacity
                                disabled={player.actions.volume.isMinimum()}
                                onPress={player.actions.volume.decrease}
                            >
                                <VolumeDownIcon
                                    size={48}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={[{flex: 1, alignItems: 'center'}]}>
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
                        </View>
                        <View style={[
                            {
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }
                        ]}>
                            <TouchableOpacity
                                disabled={player.actions.volume.isMaximum()}
                                onPress={player.actions.volume.increase}
                            >
                                <VolumeUpIcon
                                    size={48}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={player.actions.mute}
                            >
                                <MuteIcon
                                    size={28}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

export default TraditionalPlayerController;
