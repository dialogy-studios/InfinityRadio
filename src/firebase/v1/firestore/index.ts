import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";

export enum Collections {
    CONFIG="configs"
}


export interface SetObserverCallback {
    onSuccess: (doc: FirebaseFirestoreTypes.DocumentSnapshot<FirebaseFirestoreTypes.DocumentData>) => void,
    onError: (error: Error) => void
}

export const AppFirestore = {
    async setObserver(
        collection: FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>,
        docName: string,
        {onSuccess, onError}: SetObserverCallback
    ) {
        const document = collection.doc(docName)
        const docReference = await document.get()

        onSuccess(docReference)
        document
            .onSnapshot(
                onSuccess,
                onError
            )
    }
}
