import React from "react";
import {TouchableOpacity, View} from "react-native";
import ShareIcon from "../../resources/v2/ShareIcon";
import VolumeDownIcon from "../../resources/v1/icons/VolumeDownIcon";
import PlayIcon from "../../resources/v2/PlayIcon";
import PauseIcon from "../../resources/v2/PauseIcon";
import VolumeUpIcon from "../../resources/v1/icons/VolumeUpIcon";
import MuteIcon from "../../resources/v2/MuteIcon";
import {useSafePlayer} from "../../components/v1/player/config/Context";
import {useNavigation} from "@react-navigation/native";
import {ScreensNames} from "../../navigation/drawer/v1/models";

interface Props {

}

const PlayerLayout: React.FC<Props> = () => {
    const player = useSafePlayer()
    const navigation = useNavigation()

    const goToShareScreen = () => {
        navigation.navigate(ScreensNames.SHARE)
    }

    return (
        <View
            style={[
                {
                    flexDirection: 'row',
                    // backgroundColor: 'red',
                    alignItems: 'center',
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
    )
}

export default PlayerLayout
