import React, {useCallback, useEffect, useState} from 'react';
import Loading from "./MainAppScreen/states/loading";
import Error from "./MainAppScreen/states/error";
import Normal from "./MainAppScreen/states/normal"
import NetInfo, {NetInfoState} from "@react-native-community/netinfo";
import changeNavigationBarColor from 'react-native-navigation-bar-color';

enum State {
    NORMAL,
    LOADING,
    ERROR
}

const App = () => {
    const [state, setState] = useState<State>(State.LOADING);

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

        changeNavigationBarColor("black", false, true);
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
