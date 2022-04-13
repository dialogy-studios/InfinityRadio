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
    return (
        <Normal />
    )
};

export default App;
