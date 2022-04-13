import React, {createContext, useCallback, useContext, useEffect, useMemo, useState,} from 'react';
import {PlayerTemplate} from "../../player_template";
import {useSafeNetworkContext} from "../../../../context/NetworkContextProvider";

interface PlayerState {
    paused: boolean;
    muted: boolean;
    volume: number;
    maxVolume: number,
    minVolume: number,
    isVolumeLongPress: boolean,
    uiState: PlayerUiState,
    template: PlayerTemplate
}

export enum PlayerUiState {
    NORMAL,
    ERROR,
    BUFFERING
}

interface VolumeActions {
    updateVolume: (newVolume: number) => void;
    increase: () => void;
    decrease: () => void;
    startLongPressing: () => void,
    exitLongPressing: () => void,
    isMaximum: () => boolean,
    isMinimum: () => boolean
}

interface PlayerActions {
    pause: () => void;
    play: () => void;
    mute: () => void;
    updateUiState: (newState: PlayerUiState) => void;
    updateTemplate: (newTemplate: PlayerTemplate) => void;
    volume: VolumeActions;
}

export interface Player {
    state: PlayerState;
    actions: PlayerActions;
}

const PlayerContext = createContext<Player | null>(null);

function usePlayer(): Player {
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(10);
    const [longPressing, setLongPressing] = useState(false);
    const [maxVolume, setMaxVolume] = useState(10);
    const [minVolume, setMinVolume] = useState(0);
    const [playerUiState, setPlayerUiState] = useState<PlayerUiState>(PlayerUiState.BUFFERING)
    const [template, setTemplate] = useState<PlayerTemplate>(PlayerTemplate.TRADITIONAL)
    const network = useSafeNetworkContext()

    const pause = useCallback(() => {
        setPaused(!paused);
    }, [paused, setPaused]);

    const play = useCallback(() => {
        setPaused(false);
        setMuted(false);
    }, [muted, setMuted, paused, setPaused]);

    const mute = useCallback(() => {
        setMuted(!muted);
    }, [muted, setVolume]);

    const increaseVolume = useCallback(() => {
        if (volume < 10) {
            setVolume(volume + 1);
        }
    }, [volume, setVolume]);

    const decreaseVolume = useCallback(() => {
        if (volume > 0) {
            setVolume(volume - 1);
        }
    }, [volume, setVolume]);

    const updateVolume = useCallback((volume: number) => {
        if (volume >= 0 && volume <= 10) {
            setVolume(volume);
        }
    }, [setVolume]);

    const startLongPressing = useCallback(() => {
        setLongPressing(true);
    }, [setLongPressing]);

    const exitLongPressing = useCallback(() => {
        setLongPressing(false);
    }, [setLongPressing]);

    const updateUiState = useCallback((newState: PlayerUiState) => {
        setPlayerUiState(newState)
    }, [setPlayerUiState])

    const updateTemplate = useCallback((newTemplate) => {
        setTemplate(newTemplate)
    }, [setTemplate])

    const isMaximum = useCallback(() => {
        return volume == 10
    }, [volume])

    const isMinimum = useCallback(() => {
        return volume == 0
    }, [volume])

    useEffect(() => {
        if (volume == 0) {
            setMuted(true);
        } else if (muted) {
            setMuted(false);
        }

    }, [volume]);

    useEffect(() => {
        if (!network.actions.isConnected()) {
            setPlayerUiState(PlayerUiState.ERROR)
        } else {
            setPlayerUiState(PlayerUiState.BUFFERING)
        }
    }, [network.state.networkState])

    return useMemo(
        () => ({
            state: {
                paused,
                muted,
                volume,
                maxVolume,
                minVolume,
                isVolumeLongPress: longPressing,
                uiState: playerUiState,
                template
            },
            actions: {
                pause,
                play,
                mute,
                updateUiState,
                updateTemplate,
                volume: {
                    increase: increaseVolume,
                    decrease: decreaseVolume,
                    startLongPressing,
                    exitLongPressing,
                    updateVolume,
                    isMaximum,
                    isMinimum
                },
            },
        }),
        [
            updateVolume,
            startLongPressing,
            exitLongPressing,
            longPressing,
            increaseVolume,
            decreaseVolume,
            volume,
            paused,
            setMuted,
            muted,
            mute,
            pause,
            play,
            playerUiState,
            updateUiState,
            template,
            updateTemplate,
            isMaximum,
            isMinimum
        ]
    );
}

export function useSafePlayer(): Player {
    const playerContext = useContext(PlayerContext);
    if (playerContext == null) {
        throw Error(
            'Player context is null. Put the PlayerProvider tag before use.',
        );
    }
    return playerContext;
}

const PlayerProvider: React.FC<any> = ({children}) => {
    const player = usePlayer();
    return (
        <PlayerContext.Provider value={player}>{children}</PlayerContext.Provider>
    );
};

export default PlayerProvider;
