import React, {useCallback, useEffect, useState} from 'react';
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
    const [state, setState] = useState<State>(State.NORMAL);

    const handleNetState = useCallback((state: NetInfoState) => {
        if (state.isConnected) {
            setState(State.NORMAL)
        } else {
            setState(State.ERROR)
        }
    }, [setState])

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(handleNetState)
        /*const fetchListener = setTimeout(() => {
            remoteConfig().fetch(0)
        }, 60000)*/
        return () => {
            unsubscribe()
            // clearTimeout(fetchListener)
        }
    }, [])

    const renderByState: {[state: number]: any} = {
        [State.NORMAL]: () => (<Normal />),
        [State.LOADING]: () => (<Loading />),
        [State.ERROR]: () => (<Error message={'Error on initialize app'} retryAction={null} />)
    }

    const renderer = renderByState[state];
    return renderer()
};

export default App;
