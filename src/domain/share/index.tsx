import {ShareOptions} from "react-native-share/src/types";
import Share, {ShareSingleOptions} from "react-native-share";
import {useArtist} from "../artist";
import {getBase64Image} from "../blob";
import {useSafeConfigContext} from "../../firebase/v1/firestore/collection/configs";
import React, {createContext, useCallback, useContext, useMemo, useState} from "react";

interface ShareActions {
    share: (shareOptions: ShareOptions) => Promise<void>,
    sharePlayerPoster: () => Promise<void>,
    shareInstagram: (config: ShareSingleOptions) => Promise<void>,
    updateShareURI: (uri: string) => void
}

interface ShareState {
    shareURI: string | null
}

interface ShareProps {
    actions: ShareActions,
    state: ShareState
}

const ShareContext = createContext<ShareProps | null>(null)

const useShare = (): ShareProps => {
    const [shareURI, setShareURI] = useState<string | null>(null)
    const artist = useArtist()
    const config = useSafeConfigContext()

    const share = async (shareOptions: ShareOptions) => {
        await Share.open(shareOptions)
    }

    const sharePlayerPoster = useCallback(async () => {
        const imageBase64: string | null = await getBase64Image(config.state.mainScreen.player_poster)
        if (imageBase64 == null) return
        const shareOptions: ShareOptions = {
            message: artist.getDescription(),
            title: "Share to",
            type: "image/*",
            url: imageBase64
        }

        try {
            await share(shareOptions)
        } catch (error) {
            console.log('error => ', error)
        }
    }, [share])

    const shareInstagram = async (config: ShareSingleOptions) => {
        await Share.shareSingle(config)
    }

    const updateShareURI = useCallback((uri: string) => {
        setShareURI(uri)
    },[setShareURI])

    return useMemo(() => (
            {
                actions: {
                    share,
                    sharePlayerPoster,
                    shareInstagram,
                    updateShareURI
                },
                state: {
                    shareURI
                }
            }
        ),
        [
            share,
            sharePlayerPoster,
            shareInstagram,
            shareURI
        ]
    )
}

export const useSafeShareContext = () => {
    const context = useContext(ShareContext)
    if (context == null) throw Error('The component should be wrap by ShareContext')
    return context
}

export const ShareContextProvider: React.FC<any> = ({children}) => {
    const share = useShare()
    return (
        <ShareContext.Provider value={share}>
            {children}
        </ShareContext.Provider>
    )
}