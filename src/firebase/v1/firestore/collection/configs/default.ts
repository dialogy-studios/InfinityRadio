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

export const defaultMainScreenConfig: MainScreenConfig = {
    background: "",
    header_image: "",
    isLive: false,
    link_list: "",
    player_poster: ""
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
    color: "white",
    description: "Livestream",
    genre: "Techno",
    image: "",
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
