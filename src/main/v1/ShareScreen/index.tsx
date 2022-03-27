import React, {useRef} from "react";
import {ImageBackground, View} from "react-native";
import Thumb from "../../../components/v1/thumb";
import {SafeAreaView} from "react-native-safe-area-context";
import ShareOptions, {Social} from "../../../components/v1/share_options";
import ViewShot from "react-native-view-shot";
import {useSafeShareContext} from "../../../domain/share";
import {mapUriToBase64} from "../../../domain/blob";

interface Props {

}

const ShareScreen: React.FC<Props> = () => {
    const viewShot = useRef<ViewShot | null>(null)

    const shareSocialList = [
        Social.INSTAGRAM,
        Social.TWITTER
    ]

    const generateShareURI = async (): Promise<string | null> => {
        if (viewShot.current == null) return null
        try {
            const uri = await viewShot.current!!.capture()
            const base64 = await mapUriToBase64(uri)
            return base64
        } catch (error) {
            return null
        }
    }

    return (
        <ImageBackground
            style={[
                {
                    flex: 1
                }
            ]}
            source={require('../../../resources/v1/images/v1/background/background-1.jpg')}
        >

            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        // backgroundColor: 'red'
                    }
                ]}
                edges={["top"]}
            >
                <View
                    style={[
                        {
                            flex: 2
                        }
                    ]}
                >
                    <ViewShot
                        ref={viewShot}
                        options={{ format: "png", quality: 0.9 }}
                        style={[
                            {
                                flex: 1,
                                backgroundColor: 'transparent'
                            }
                        ]}
                    >
                        <Thumb
                            variant={"share-thumb"}
                        />
                    </ViewShot>
                </View>
                <View
                    style={[
                        {
                            flex: 1,
                        }
                    ]}
                >
                    <ShareOptions
                        shareOptionList={shareSocialList}
                        onRequestURI={generateShareURI}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ShareScreen
