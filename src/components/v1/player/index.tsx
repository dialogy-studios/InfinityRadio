import React, {useEffect} from "react";
import {UiState, useSafeMainContext} from "../../../main/v1/config/MainContext";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import MusicControl, {Command} from "react-native-music-control";
import {Platform, View} from "react-native";
import Video from 'react-native-video';
import {PlayerUiState, useSafePlayer} from "./config/Context";


const Player: React.FC<any> = () => {
    const player = useSafePlayer();
    const mainContext = useSafeMainContext();
    const config = useSafeConfigContext();
    const remoteURL =
        'https://urbanradioireland.out.airtime.pro:8000/urbanradioireland_c?_ga=2.35923040.1587061543.1641428521-1929476278.1640869959';

    const setPlayer = () => {
        MusicControl.enableBackgroundMode(true);
        if (Platform.OS == "ios") {
            MusicControl.handleAudioInterruptions(true)
        }
        // Basic Controls
        MusicControl.enableControl('play', true)
        MusicControl.enableControl('pause', true)
        MusicControl.enableControl('stop', false)
        MusicControl.enableControl('nextTrack', false)
        MusicControl.enableControl('previousTrack', false)

        MusicControl.enableControl('seekForward', false) // iOS only
        MusicControl.enableControl('seekBackward', false) // iOS only
        MusicControl.enableControl('seek', false) // Android only
        MusicControl.enableControl('skipForward', false)
        MusicControl.enableControl('skipBackward', false)

        MusicControl.enableControl('setRating', false)
        MusicControl.enableControl('volume', true) // Only affected when remoteVolume is enabled
        MusicControl.enableControl('remoteVolume', true)

        MusicControl.enableControl('enableLanguageOption', false)
        MusicControl.enableControl('disableLanguageOption', false)

        MusicControl.enableControl('closeNotification', true, { when: 'never' })

        MusicControl.on(Command.play, ()=> {
            player.actions.play()
        })

        MusicControl.on(Command.pause, ()=> {
            player.actions.pause()
        })

        MusicControl.on(Command.stop, ()=> {
            player.actions.pause()
        })

        MusicControl.on(Command.volume, (volume)=> {
            player.actions.volume.updateVolume(volume)
        })

        MusicControl.on(Command.togglePlayPause, ()=> {
            player.actions.play()
        }); // iOS only
    }

    useEffect(() => {
        setPlayer()
    }, [])

    useEffect(() => {
        if (player.state.paused) {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PAUSED,
            })
        } else {
            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING,
            })
        }
    }, [player.state.paused])

    useEffect(() => {
        MusicControl.updatePlayback({
            volume: player.state.volume,
            maxVolume: player.state.maxVolume
        })

    }, [player.state.volume])

    useEffect(() => {
        var newState = MusicControl.STATE_BUFFERING
        if (mainContext.state.ui == UiState.ERROR) {
            newState = MusicControl.STATE_ERROR
        } else if (mainContext.state.ui == UiState.LOADING) {
            newState = MusicControl.STATE_BUFFERING
        } else if (mainContext.state.ui == UiState.NORMAL) {
            newState = MusicControl.STATE_PLAYING
        }

        if (newState != null) {
            MusicControl.updatePlayback({state: newState})
        }
    }, [mainContext.state.ui])

    if (player.state.uiState == PlayerUiState.ERROR) return null

    return (
        <View
            style={[{
                position: 'absolute'
            }]}
        >
            <Video
                allowsExternalPlayback={true}
                audioOnly={true}
                source={{uri: remoteURL}} // Can be a URL or a local file.
                playInBackground={true}
                playWhenInactive={true}
                ignoreSilentSwitch={'ignore'}
                paused={player.state.paused}
                // paused={true}
                muted={player.state.muted}
                volume={player.state.volume / 10}
                ref={() => {
                    // this.player = ref;
                }} // Store reference
                onLoad={() => {
                    mainContext.methods.updateUiState(UiState.NORMAL)
                    MusicControl.setNowPlaying({
                        title: config.state.playerLockScreen.title,
                        artwork: config.state.playerLockScreen.image, // URL or RN's image require()
                        artist: config.state.playerLockScreen.artist,
                        album: config.state.playerLockScreen.album,
                        genre: config.state.playerLockScreen.genre,
                        duration: 0, // (Seconds)
                        description: config.state.playerLockScreen.description, // Android Only
                        color: config.state.playerLockScreen.color, // Android Only - Notification Color
                        colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
                        date: new Date().toISOString(), // Release Date (RFC 3339) - Android Only
                        rating: 83, // Android Only (Boolean or Number depending on the type)
                        notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
                        isLiveStream: config.state.mainScreen.isLive, // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
                    })
                }}
                onBuffer={() => {

                }} // Callback when remote video is buffering
                onError={(error: Error) => {
                    mainContext.methods.updateUiState(UiState.ERROR)
                }} // Callback when video cannot be loaded
            />
        </View>
    )
}

export default Player
