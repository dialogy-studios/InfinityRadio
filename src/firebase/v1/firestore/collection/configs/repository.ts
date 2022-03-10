import firestore from "@react-native-firebase/firestore";
import {AppFirestore, Collections, SetObserverCallback} from "../../index";

const configCollection = firestore().collection(Collections.CONFIG);

/*const documents = {
        mainScreen: configCollection.doc(ConfigCollectionDocuments.MAIN_SCREEN),
        play: configCollection.doc(ConfigCollectionDocuments.PLAY),
        pause: configCollection.doc(ConfigCollectionDocuments.PAUSE),
        volumeUp: configCollection.doc(ConfigCollectionDocuments.VOLUME_UP),
        volumeDown: configCollection.doc(ConfigCollectionDocuments.VOLUME_DOWN),
        volumeMute: configCollection.doc(ConfigCollectionDocuments.VOLUME_MUTE),
        playerSlider: configCollection.doc(ConfigCollectionDocuments.PLAYER_SLIDER),
        playerLockScreen: configCollection.doc(ConfigCollectionDocuments.PLAYER_LOCK_SCREEN)

    }*/

export const Config = {
    async getRealtimeConfig (id: ConfigCollectionDocuments, callback: SetObserverCallback) {
        await AppFirestore
            .setObserver(
                configCollection,
                id,
                callback
            )
    },

}
