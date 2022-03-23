import {useSafeConfigContext} from "../../firebase/v1/firestore/collection/configs";
import {useCallback, useMemo} from "react";

interface Artist {
    getDescription: () => string
}

export const useArtist = (): Artist => {
    const config = useSafeConfigContext()

    const getDescription = useCallback(() => {
        return `${config.state.playerLockScreen.artist} breaking out the tunes!`
    }, [])

    return useMemo(() => (
        {
            getDescription
        }
    ) ,
        [
            getDescription
        ])
}
