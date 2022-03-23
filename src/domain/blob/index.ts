import RNFetchBlob from "rn-fetch-blob";

export const getBase64 = async (url: string): Promise<string | null> => {
    try {
        const img = await RNFetchBlob.fetch("GET", url)
        return img.base64()
    } catch (error) {
        return null
    }
}
