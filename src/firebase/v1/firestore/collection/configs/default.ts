import {
    ButtonConfig, ConfigsCollectionState, GeneralConfig,
    MainScreenConfig,
    PauseButtonConfig,
    PlayButtonConfig, PlayerLockScreenConfig, PlayerSliderConfig, VolumeDownButtonConfig,
    VolumeMuteButtonConfig,
    VolumeUpButtonConfig
} from "./models";


export const defaultGeneralConfig: GeneralConfig = {
    status_bar: "light-content"
}

const imgDefault = "https://firebasestorage.googleapis.com/v0/b/irelandradio-e7c2d.appspot.com/o/player_poster%2FDaniel%20Infinity%20Radio.jpg?alt=media&token=80ee34c3-3539-4b0e-a518-6872034577a5"


export const defaultMainScreenConfig: MainScreenConfig = {
    background: imgDefault,
    header_image: imgDefault,
    isLive: false,
    link_list: "",
    player_poster: imgDefault
}

const defaultButtonConfig: ButtonConfig =  {color: "white", size: 46}

export const defaultPlayConfigState: PlayButtonConfig = defaultButtonConfig

export const defaultPauseConfigState: PauseButtonConfig = defaultButtonConfig

export const defaultVolumeMuteConfigState: VolumeMuteButtonConfig = defaultButtonConfig

export const defaultVolumeUpConfigState: VolumeUpButtonConfig = defaultButtonConfig

export const defaultVolumeDownConfigState: VolumeDownButtonConfig = defaultButtonConfig

export const defaultPlayerSliderConfigState: PlayerSliderConfig = {
    player_slider_button_color: "white",
    player_slider_maximum_track_color: "white",
    player_slider_minimum_track_color: "white"
}

export const defaultPlayerLockScreenConfigState: PlayerLockScreenConfig = {
    album: "#1",
    artist: "Infinity Radio",
    color: 0,
    description: "Livestream",
    genre: "Techno",
    image: imgDefault,
    title: "Enjoy us!"
}

export const defaultConfigState: ConfigsCollectionState = {
    general: defaultGeneralConfig,
    mainScreen: defaultMainScreenConfig,
    pause: defaultPauseConfigState,
    play: defaultPlayConfigState,
    playerLockScreen: defaultPlayerLockScreenConfigState,
    playerSlider: defaultPlayerSliderConfigState,
    volumeDown: defaultVolumeDownConfigState,
    volumeMute: defaultVolumeMuteConfigState,
    volumeUp: defaultVolumeUpConfigState

}
