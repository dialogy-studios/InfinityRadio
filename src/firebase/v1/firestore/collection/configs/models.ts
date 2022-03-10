export enum ConfigCollectionDocuments {
    MAIN_SCREEN="main_screen",
    PLAY="play",
    PAUSE="pause",
    VOLUME_UP="volumeUp",
    VOLUME_DOWN="volumeDown",
    VOLUME_MUTE="volumeMute",
    PLAYER_SLIDER="playerSlider",
    PLAYER_LOCK_SCREEN="playerLockScreen"
}

export interface ConfigsCollectionState {
    mainScreen: MainScreenConfig,
    play: PlayButtonConfig,
    pause: PauseButtonConfig,
    volumeUp: VolumeUpButtonConfig,
    volumeDown: VolumeDownButtonConfig
    volumeMute: VolumeMuteButtonConfig,
    playerLockScreen: PlayerLockScreenConfig,
    playerSlider: PlayerSliderConfig,
}

export interface MainScreenConfig {
    background: string,
    player_poster: string,
    header_image: string,
    link_list: string, // JSON stringified
    isLive: boolean
}

export interface ButtonConfig {
    size: number,
    color: string
}

export interface PlayButtonConfig extends ButtonConfig{}

export interface PauseButtonConfig extends ButtonConfig {}

export interface VolumeUpButtonConfig extends ButtonConfig {}

export interface VolumeDownButtonConfig extends ButtonConfig {}

export interface VolumeMuteButtonConfig extends ButtonConfig {}

export interface PlayerLockScreenConfig {
    title: string,
    image: string,
    artist: string,
    album: string,
    genre: string,
    description: string,
    color: string
}

export interface PlayerSliderConfig {
    player_slider_minimum_track_color: string,
    player_slider_maximum_track_color: string,
    player_slider_button_color: string
}

