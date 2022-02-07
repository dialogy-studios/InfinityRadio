import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface PlayerState {
  paused: boolean;
  muted: boolean;
  volume: number;
  isVolumeLongPress: boolean,
}

interface VolumeActions {
  updateVolume: (newVolume: number) => void;
  increase: (value?: number) => void;
  decrease: (value?: number) => void;
  startLongPressing: () => void,
  exitLongPressing: () => void,
}

interface PlayerActions {
  pause: () => void;
  play: () => void;
  mute: () => void;
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

  const pause = useCallback(() => {
    setPaused(!paused);
  }, [paused, setPaused]);

  const play = useCallback(() => {
    setPaused(false);
    setMuted(false);
  }, [muted, setMuted, paused, setPaused]);

  const mute = useCallback(() => {
    setMuted(!muted);
  }, [muted, setMuted]);

  const increaseVolume = useCallback((value?: number) => {
    if (value != null && value != volume) {
      const finalVolume = Math.floor(volume + value/10);
      if (finalVolume >= 0 && finalVolume <= 10 && finalVolume != volume) {
        if (value > 0) {
          setVolume(volume + 1);
        } else {
          setVolume(volume + -1);
        }
      }
    } else {
      if (volume < 10) {
        setVolume(volume + 1);
      }
    }

  }, [volume, setVolume]);

  const decreaseVolume = useCallback((value?: number) => {
    if (value != null) {
      console.log("hello from decrease!");
    } else {
      if (volume > 0) {
        setVolume(volume - 1);
      }
    }
  }, [volume, setVolume]);

  const updateVolume = useCallback((volume: number) => {
    setVolume(volume);
  }, [setVolume])

  const startLongPressing = useCallback(() => {
    setLongPressing(true);
  }, [setLongPressing]);

  const exitLongPressing = useCallback(() => {
    setLongPressing(false);
  }, [setLongPressing])

  return useMemo(
    () => ({
      state: {
        paused,
        muted,
        volume,
        isVolumeLongPress: longPressing
      },
      actions: {
        pause,
        play,
        mute,
        volume: {
          increase: increaseVolume,
          decrease: decreaseVolume,
          startLongPressing,
          exitLongPressing,
          updateVolume
        },
      },
    }),
    [updateVolume, startLongPressing, exitLongPressing, longPressing, increaseVolume, decreaseVolume, volume, paused, muted, mute, pause, play],
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
