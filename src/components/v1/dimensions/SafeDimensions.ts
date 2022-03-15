import {ScaledSize, useWindowDimensions} from "react-native";
import {useEffect, useMemo} from "react";
import DeviceInfo from "react-native-device-info";

export const useSafeWindowDimensions = (): ScaledSize => {
    const dimensions = useWindowDimensions()

    useEffect(() => {
        if (DeviceInfo.hasNotch()) {
            dimensions.height -= 30
        }
    }, [dimensions])

    return useMemo(() => (
        dimensions
    ), [
        dimensions
    ])
}
