import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {SetObserverCallback} from "../../index";
import {defaultConfigState} from "./default";
import {Config} from "./repository";
import {
    ConfigCollectionDocuments,
    ConfigsCollectionState, GeneralConfig,
    MainScreenConfig,
    PauseButtonConfig,
    PlayButtonConfig,
    PlayerLockScreenConfig,
    PlayerSliderConfig,
    VolumeDownButtonConfig,
    VolumeMuteButtonConfig,
    VolumeUpButtonConfig
} from "./models";

interface Props {
    state: ConfigsCollectionState,
    actions: ConfigCollectionAction
}

interface ConfigCollectionAction {

}

const ConfigContext = createContext<Props | null>(null)

export const useSafeConfigContext = () => {
    const context = useContext(ConfigContext)
    if (context == null) throw Error("The component must be wrapped by ConfigContextProvider!")
    return context
}

interface GetConfigPayload {
    document: ConfigCollectionDocuments,
    callback: SetObserverCallback
}

const useConfigContext = (): Props  => {
    const [config, setConfig] = useState<ConfigsCollectionState>(defaultConfigState)

    const generalConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as GeneralConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    general: data
                }
            })
        },
        onError: () => {}
    }

    const mainScreenConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as MainScreenConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    mainScreen: data
                }
            })
        },
        onError: () => {}
    }

    const playButtonConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as PlayButtonConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    play: data
                }
            })
        },
        onError: () => {}
    }

    const pauseButtonConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as PauseButtonConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    pause: data
                }
            })
        },
        onError: () => {}
    }

    const volumeUpButtonConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as VolumeUpButtonConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    volumeUp: data
                }
            })
        },
        onError: () => {}
    }

    const volumeDownButtonConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as VolumeDownButtonConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    volumeDown: data
                }
            })
        },
        onError: () => {}
    }

    const volumeMuteButtonConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as VolumeMuteButtonConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    volumeMute: data
                }
            })
        },
        onError: () => {}
    }

    const playerSliderConfigRequestCallback: SetObserverCallback = {
        onSuccess(doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) {
            const data = doc.data() as PlayerSliderConfig
            setConfig((prevState) => {
                return {
                    ...prevState,
                    playerSlider: data
                }
            })
        },
        onError: () => {}
    }

    const playerLockScreenConfigRequestCallback: SetObserverCallback = {
        onSuccess: useCallback((doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) => {
        const data = doc.data() as PlayerLockScreenConfig
        setConfig({
            ...config,
            playerLockScreen: {
                ...config.playerLockScreen,
                ...data
            }
        })
    }, [config, setConfig]),
        onError: () => {}
    }

    const configPayloadList: GetConfigPayload[] = [
        {document: ConfigCollectionDocuments.GENERAL_CONFIG, callback: generalConfigRequestCallback},
        {document: ConfigCollectionDocuments.MAIN_SCREEN, callback: mainScreenConfigRequestCallback},
        {document: ConfigCollectionDocuments.PLAY, callback: playButtonConfigRequestCallback},
        {document: ConfigCollectionDocuments.PAUSE, callback: pauseButtonConfigRequestCallback},
        {document: ConfigCollectionDocuments.VOLUME_UP, callback: volumeUpButtonConfigRequestCallback},
        {document: ConfigCollectionDocuments.VOLUME_DOWN, callback: volumeDownButtonConfigRequestCallback},
        {document: ConfigCollectionDocuments.VOLUME_MUTE, callback: volumeMuteButtonConfigRequestCallback},
        {document: ConfigCollectionDocuments.PLAYER_SLIDER, callback: playerSliderConfigRequestCallback},
        {document: ConfigCollectionDocuments.PLAYER_LOCK_SCREEN, callback: playerLockScreenConfigRequestCallback},
    ]

    const getConfigs = async () => {
        configPayloadList
            .forEach(({document, callback}) => {
                Config.getRealtimeConfig(document, callback)
            })
    }

    useEffect(() => {
        getConfigs()
    }, [])

    return useMemo(() => (
        {
            state: config,
            actions: {}
        }
    ), [
        config,
        setConfig
    ])
}

export const ConfigContextProvider: React.FC<any> = ({children}) => {
    const context = useConfigContext()
    return (
        <ConfigContext.Provider  value={context}>
            {children}
        </ConfigContext.Provider>
    )
}
