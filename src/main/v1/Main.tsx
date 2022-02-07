import React, {useEffect, useState} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import remoteConfigDefaults from "../../firebase/v1/remoteconfig/remoteConfigDefaults";
import Normal from "./states/Normal";
import Loading from "./states/Loading";
import Error from "./states/Error";
enum State {
    NORMAL,
    LOADING,
    ERROR
}

const App = () => {
    const [state, setState] = useState<State>(State.LOADING);

    const setup = async () => {
        try {
            await remoteConfig().setDefaults(remoteConfigDefaults)
            await remoteConfig().fetchAndActivate()
            await remoteConfig().fetch(0)
            setState(State.NORMAL)
        } catch (error) {
            setState(State.ERROR)
        }
    }

    useEffect(() => {
        setState(State.LOADING);
        // requestUserPermission()
        setup()
    }, [])

    const renderByState: {[state: number]: any} = {
        [State.NORMAL]: () => (<Normal />),
        [State.LOADING]: () => (<Loading />),
        [State.ERROR]: () => (<Error />)
    }

    const renderer = renderByState[state];
    return renderer()
};

export default App;
