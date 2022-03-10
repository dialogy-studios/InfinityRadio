import React, {useCallback, useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import remoteConfigDefaults from "../../firebase/v1/remoteconfig/remoteConfigDefaults";
import Loading from "./states/loading";
import Error from "./states/error";
import Normal from "./states/normal"
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";

enum State {
    NORMAL,
    LOADING,
    ERROR
}

const App = () => {
    const [state, setState] = useState<State>(State.LOADING);
    const [errorMsg, setErrorMessage] = useState<string>("")

    const setup = async () => {
        try {
            setState(State.LOADING);
            await remoteConfig().setDefaults(remoteConfigDefaults)
            await remoteConfig().fetchAndActivate()
            await remoteConfig().fetch(0)
            setState(State.NORMAL)
        } catch (error: Error) {
            setState(State.ERROR)
            setErrorMessage(error.message)
        }
    }

    const handleNetState = useCallback((state: NetInfoState) => {
        if (state.isConnected) {
            setup()
        } else {
            setState(State.ERROR)
        }
    }, [setState])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(handleNetState)
        const fetchListener = setTimeout(() => {
            remoteConfig().fetch(0)
        }, 60000)
        return () => {
            unsubscribe()
            clearTimeout(fetchListener)
        }
    }, [])

    const renderByState: {[state: number]: any} = {
        [State.NORMAL]: () => (<Normal />),
        [State.LOADING]: () => (<Loading />),
        [State.ERROR]: () => (<Error message={errorMsg} retryAction={setup} />)
    }

    const renderer = renderByState[state];
    return renderer()
};

export default App;
