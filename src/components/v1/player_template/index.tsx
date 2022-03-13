import React, {useEffect, useRef} from "react";
import TraditionalTemplate from "./traditional_template";
import SpotifyTemplate, {SpotifyTemplateMethods} from "./spotify_template";
import {Animated, View} from "react-native";

export enum PlayerTemplate {
    TRADITIONAL,
    SPOTIFY
}

const PlayerTemplateRenderer: React.FC<Props> = ({template}) => {
    const spotifyTemplateRef = useRef<SpotifyTemplateMethods | null>(null)
    const traditionalTemplateRef = useRef<SpotifyTemplateMethods | null>(null)

    const startSpotifyTemplateAnimation = (toValue: number) => {
        const config: Animated.TimingAnimationConfig = {
            useNativeDriver: true,
            toValue: toValue,
            duration: 500
        }
        if (spotifyTemplateRef.current != null) {
            spotifyTemplateRef.current?.fade(config, true)
        }
    }

    const startTraditionalTemplateAnimation = (toValue: number) => {
        const config: Animated.TimingAnimationConfig = {
            useNativeDriver: true,
            toValue: toValue,
            duration: 500
        }
        if (traditionalTemplateRef.current != null) {
            traditionalTemplateRef.current?.fade(config, true)
        }
    }

    useEffect(() => {
        if (template == PlayerTemplate.TRADITIONAL) {
            startTraditionalTemplateAnimation(1)
            startSpotifyTemplateAnimation(0)
        } else if (template == PlayerTemplate.SPOTIFY) {
            startSpotifyTemplateAnimation(1)
            startTraditionalTemplateAnimation(0)

        }
    }, [template])

    return (
        <>
            <TraditionalTemplate ref={traditionalTemplateRef} />
            <SpotifyTemplate ref={spotifyTemplateRef} />
        </>
    )
}

interface Props {
    template: PlayerTemplate
}

export default PlayerTemplateRenderer
