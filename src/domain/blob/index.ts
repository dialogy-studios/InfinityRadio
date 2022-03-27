import RNFetchBlob from "rn-fetch-blob";

export const getBase64 = async (url: string): Promise<string | null> => {
    try {
        const img = await RNFetchBlob.fetch("GET", url)
        return img.base64()
    } catch (error) {
        return null
    }
}

export const getBase64Image = async (url: string): Promise<string> => {
    try {
        const base64 = await getBase64( url)
        const imageBase64 = `data:image/png;base64,${base64 || ""}`
        return imageBase64
    } catch (error) {
        return ""
    }
}
