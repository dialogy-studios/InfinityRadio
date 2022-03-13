import * as React from 'react';
import {Image, View} from 'react-native';
import VolumeButtons from './volume';
import Play from './play';
import Pause from './pause';
import {useSafePlayer} from '../../player/config/Context';
import LiveLabel from "./livelabel";
import Slider from "@react-native-community/slider";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import Centered from "../../../../resources/v1/styles/view/Centered";
import FlexColumn from "../../../../resources/v1/styles/view/FlexColumn";
import AlignEnd from "../../../../resources/v1/styles/view/AlignEnd";
import Square250 from "../../../../styles/images/v1/config/Square250";
import FlexRow from "../../../../resources/v1/styles/view/FlexRow";
import AlignCenter from "../../../../resources/v1/styles/view/AlignCenter";
import JustifyCenter from "../../../../resources/v1/styles/view/JustifyCenter";

const TraditionalPlayerController = () => {
  const player = useSafePlayer();
  const config = useSafeConfigContext();

    return (
        <View
            style={[
                Centered,
                {
                    flex: 3,
                    // backgroundColor: 'pink',
                },
            ]}>
            <View
                style={[
                    FlexColumn,
                    {
                        flex: 3,
                        justifyContent: 'center',
                        // backgroundColor: 'yellow',
                    },
                ]}>
                <View
                    style={[
                        {
                            flex: .2,
                            // backgroundColor: 'white',
                            marginBottom: 10
                        }
                    ]}

                >
                    <LiveLabel isLive={config.state.mainScreen.isLive}/>
                </View>
                <View style={[
                    AlignEnd
                ]}>
                    <Image
                        style={[
                            Square250
                        ]}
                        source={{
                            uri: config.state.mainScreen.player_poster
                        }}
                        resizeMode={'stretch'}
                    />
                </View>
            </View>
            <View
                style={[
                    FlexColumn,
                    {
                        // backgroundColor: 'blue',
                    },
                ]}>
                <View
                    style={[
                        {
                            flex: 1
                        },
                        {
                            // backgroundColor: 'yellow'
                        }
                    ]}>
                    <Slider
                        style={{flex: 1}}
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
                <View
                    style={[
                        FlexRow,
                        JustifyCenter,
                        AlignCenter,
                        {
                            // backgroundColor: 'yellow',
                        },
                    ]}>
                    {
                        player.state.paused ? (<Play player={player}/>) : (<Pause player={player}/>)
                    }
                    <VolumeButtons player={player}/>
                </View>
            </View>
        </View>
    );
};

export default TraditionalPlayerController;
