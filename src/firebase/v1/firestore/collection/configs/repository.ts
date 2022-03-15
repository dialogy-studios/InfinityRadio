import firestore from "@react-native-firebase/firestore";
import {AppFirestore, Collections, SetObserverCallback} from "../../index";
import {ConfigCollectionDocuments} from "./models";

const configCollection = firestore().collection(Collections.CONFIG);

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
