import React, {useRef} from "react";
import {Dimensions, ImageBackground, ScrollView, View} from "react-native";
import Thumb from "../../../components/v1/thumb";
import {SafeAreaView} from "react-native-safe-area-context";
import ShareOptions, {SocialType} from "../../../components/v1/share_options";
import ViewShot from "react-native-view-shot";
import {mapUriToBase64} from "../../../domain/blob";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import ShareScreenHeader from "../../../components/v1/headers/share_screen_header";

interface Props {

}

const ShareScreen: React.FC<Props> = () => {
    const viewShot = useRef<ViewShot | null>(null)
    const navigation: StackNavigationProp<any> = useNavigation()

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
                    }
                ]}
                edges={["top"]}
            >
                <ShareScreenHeader navigation={navigation}/>
                <ScrollView
                >
                    <ViewShot
                        ref={viewShot}
                        options={{ format: "png", quality: 0.9 }}
                        style={[
                            {
                                marginTop: 20,
                                height: 450,
                                width: Dimensions.get('window').width,
                                backgroundColor: 'transparent'
                            }
                        ]}
                    >
                        <Thumb
                            variant={"share-thumb"}
                        />
                    </ViewShot>
                    <View
                        style={[
                            {
                                height: 300,
                                // backgroundColor: 'pink'
                            }
                        ]}
                    >
                        <ShareOptions
                            onRequestURI={generateShareURI}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ShareScreen
