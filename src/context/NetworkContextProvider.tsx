import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";
import changeNavigationBarColor from "react-native-navigation-bar-color";

interface NetworkState {
    readonly networkState: NetInfoState | null
}

interface NetworkAction {
    isConnected: () => Boolean
}
interface Props {
    state: NetworkState,
    actions: NetworkAction
}

const NetworkContext = createContext<Props | null>(null)

const useNetworkContext = (): Props => {
    const [networkState, setNetworkState] = useState<NetInfoState | null>(null)

    const handleNetState = useCallback((state: NetInfoState) => {
        setNetworkState(state)
    }, [setNetworkState])

    const isConnected = useCallback(() => {
        return networkState?.isConnected || false
    }, [networkState])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(handleNetState)

        changeNavigationBarColor("black", false, true);
        return () => {
            unsubscribe()
        }
    }, [])

    return useMemo(() => (
            {
                state: {
                    networkState
                },
                actions: {
                    isConnected
                }
            }
    ),
        [
            isConnected,
            networkState
        ])
}

export const useSafeNetworkContext = () => {
    const context = useContext(NetworkContext);
    if (context == null) throw Error("The component isn't wrapped by NetworkContextProvider!");
    return context;
}

const NetworkContextProvider: React.FC<any> = ({children}) => {
    const context = useNetworkContext()
    return (
        <NetworkContext.Provider value={context}>
            {children}
        </NetworkContext.Provider>
    )
}

export default NetworkContextProvider
