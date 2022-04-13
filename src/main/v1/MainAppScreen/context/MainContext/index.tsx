import React, {createContext, useCallback, useContext, useMemo, useState} from "react";

export enum UiState {
    NORMAL,
    LOADING,
    ERROR
}

interface State {
    ui: UiState,
}

interface Methods {
    updateUiState: (state: UiState) => void
}

interface Props {
    state: State,
    methods: Methods
}

const MainContext = createContext<Props | null>(null)

export const useSafeMainContext = () => {
    const context = useContext(MainContext)
    if (context == null) throw Error("The component isn't wrapped by MainContextProvider.")
    return context
}

const useMainContext = (): Props => {
    const [uiState, setUiState] = useState<UiState>(UiState.LOADING)

    const updateUiState = useCallback((state: UiState) => {
        setUiState(state)
    }, [setUiState])

    return useMemo(() => (
        {
            state: {
                ui: uiState
            },
            methods: {
                updateUiState
            }
        }
    ), [
        uiState, setUiState
    ])
}

const MainContextProvider: React.FC<any> = ({children}) => {
    const context = useMainContext()
    return (
        <MainContext.Provider value={context}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider
