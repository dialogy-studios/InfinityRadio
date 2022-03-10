import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import {SetObserverCallback} from "../../index";
import {defaultConfigState} from "./default";
import {Config} from "./repository";
import {ConfigCollectionDocuments, ConfigsCollectionState, MainScreenConfig} from "./models";

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

    const configPayloadList: GetConfigPayload[] = [
        {document: ConfigCollectionDocuments.MAIN_SCREEN, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.PLAY, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.PAUSE, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.VOLUME_UP, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.VOLUME_DOWN, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.VOLUME_MUTE, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.PLAYER_SLIDER, callback: mainScreenConfigRequestCallback},
        // {document: ConfigCollectionDocuments.PLAYER_LOCK_SCREEN, callback: mainScreenConfigRequestCallback},
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
