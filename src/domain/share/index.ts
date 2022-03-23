import {ShareOptions} from "react-native-share/src/types";
import Share from "react-native-share";
import {useArtist} from "../artist";
import {getBase64} from "../blob";
import {useSafeConfigContext} from "../../firebase/v1/firestore/collection/configs";
import {useCallback, useMemo} from "react";

interface ShareProps {
    share: (shareOptions: ShareOptions) => Promise<void>,
    sharePlayerPoster: () => Promise<void>
}


export const useShare = (): ShareProps => {
    const artist = useArtist()
    const config = useSafeConfigContext()

    const share = async (shareOptions: ShareOptions) => {
        await Share.open(shareOptions)
    }

    const sharePlayerPoster = useCallback(async () => {
        const base64: string | null = await getBase64(config.state.mainScreen.player_poster)
        if (base64 == null) return
        const shareOptions: ShareOptions = {
            message: artist.getDescription(),
            title: "Share to",
            type: "image/*",
            url: `data:image/png;base64,${base64}`
        }

        try {
            await share(shareOptions)
        } catch (error) {
            console.log('error => ', error)
        }
    }, [share])

    return useMemo(() => (
            {
                share,
                sharePlayerPoster
            }
        ),
        [
            share,
            sharePlayerPoster
        ]
    )
}
