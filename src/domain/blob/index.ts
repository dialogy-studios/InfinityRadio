import RNFetchBlob from "rn-fetch-blob";

export const getBase64 = async (url: string): Promise<string | null> => {
    try {
        const img = await RNFetchBlob.fetch("GET", url)
        return img.base64()
    } catch (error) {
        return null
    }
}

export const mapUriToBase64 = async (uri: string): Promise<string | null> => {
    try {
        const base64 = await RNFetchBlob.fs.readFile(uri, "base64")
        return mapImageBase64(base64)
    } catch (error) {
        return null
    }
}

export const mapImageBase64 = (payload: string | null) => {
    return `data:image/png;base64,${payload || ""}`
}

export const getBase64Image = async (url: string): Promise<string> => {
    try {
        const base64 = await getBase64( url)
        return mapImageBase64(base64)
    } catch (error) {
        return ""
    }
}
