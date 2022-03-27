import {ShareOptions} from "react-native-share/src/types";
import Share, {ShareSingleOptions} from "react-native-share";
import {useArtist} from "../artist";
import {getBase64Image} from "../blob";
import {useSafeConfigContext} from "../../firebase/v1/firestore/collection/configs";
import {useCallback, useMemo} from "react";

interface ShareProps {
    share: (shareOptions: ShareOptions) => Promise<void>,
    sharePlayerPoster: () => Promise<void>,
    shareInstagram: (config: ShareSingleOptions) => Promise<void>
}

export const useShare = (): ShareProps => {
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

    return useMemo(() => (
            {
                share,
                sharePlayerPoster,
                shareInstagram
            }
        ),
        [
            share,
            sharePlayerPoster,
            shareInstagram
        ]
    )
}
