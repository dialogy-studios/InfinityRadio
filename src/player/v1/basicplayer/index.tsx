import * as React from 'react';
import Video from 'react-native-video';
import {Image, View} from 'react-native';
import Square250 from '../../../styles/images/v1/config/Square250';
import VolumeButtons from './volume';
import Play from './play';
import Pause from './pause';
import FlexRow from '../../../resources/v1/styles/view/FlexRow';
import Centered from '../../../resources/v1/styles/view/Centered';
import {useSafePlayer} from './config/Context';
import remoteConfig from "@react-native-firebase/remote-config";
import MusicControl, {Command} from 'react-native-music-control'
import {useEffect} from "react";
import AlignCenter from "../../../resources/v1/styles/view/AlignCenter";
import JustifyCenter from "../../../resources/v1/styles/view/JustifyCenter";
import FlexColumn from "../../../resources/v1/styles/view/FlexColumn";
import LiveLabel from "./livelabel";
import AlignEnd from "../../../resources/v1/styles/view/AlignEnd";
import Slider from "@react-native-community/slider";

const BasicPlayer = () => {
  const player = useSafePlayer();
  const remoteURL =
    'https://urbanradioireland.out.airtime.pro:8000/urbanradioireland_c?_ga=2.35923040.1587061543.1641428521-1929476278.1640869959';

  useEffect(() => {
      MusicControl.enableBackgroundMode(true);
      // MusicControl.handleAudioInterruptions(true);
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
          {
            flex: 3,
            justifyContent: 'center',
            // backgroundColor: 'yellow',
          },
        ]}>

          <View style={[
              AlignEnd
          ]}>
              <Image
                  style={[
                      Square250
                  ]}
                  source={{
                      uri: remoteConfig().getString('player_avatar'),
                  }}
                  resizeMode={'stretch'}
              />
              <LiveLabel isLive={remoteConfig().getBoolean('is_live')} />
          </View>
      </View>
      <View
        style={[
          FlexColumn,
          {
            // backgroundColor: 'blue',
          },
        ]}>
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
              MusicControl.setNowPlaying({
                  title: remoteConfig().getString('player_title'),
                  artwork: remoteConfig().getString('player_image'), // URL or RN's image require()
                  artist: remoteConfig().getString('player_artist'),
                  album: remoteConfig().getString('player_album'),
                  genre: remoteConfig().getString('player_genre'),
                  duration: 1000000000000000000000000, // (Seconds)
                  description: remoteConfig().getString('player_description'), // Android Only
                  color: remoteConfig().getNumber('player_color'), // Android Only - Notification Color
                  colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
                  date: new Date().toISOString(), // Release Date (RFC 3339) - Android Only
                  rating: 83, // Android Only (Boolean or Number depending on the type)
                  notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
                  isLiveStream: remoteConfig().getBoolean('is_live'), // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
              })
          }}
          onBuffer={() => {
          }} // Callback when remote video is buffering
          onError={(error: Error) => {
            console.log('error => ', error);
          }} // Callback when video cannot be loaded
        />
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
                  minimumTrackTintColor={remoteConfig().getString('player_slider_minimum_track_color')}
                  maximumTrackTintColor={remoteConfig().getString('player_slider_maximum_track_color')}
                  thumbTintColor={remoteConfig().getString('player_slider_button_color')}
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
                player.state.paused ? (<Play player={player} />) : (<Pause player={player} />)
            }
            <VolumeButtons player={player} />
        </View>
      </View>
    </View>
  );
};

export default BasicPlayer;
