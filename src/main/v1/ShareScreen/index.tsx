import React from "react";
import {ImageBackground, View} from "react-native";
import Thumb from "../../../components/v1/thumb";
import {SafeAreaView} from "react-native-safe-area-context";
import ShareOptions, {Social} from "../../../components/v1/share_options";

interface Props {

}

const ShareScreen: React.FC<Props> = () => {
    const shareSocialList = [
        Social.INSTAGRAM,
        Social.TWITTER
    ]

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
                    <Thumb variant={"share-thumb"}/>
                </View>
                <View
                    style={[
                        {
                            flex: 1,
                        }
                    ]}
                >
                    <ShareOptions shareOptionList={shareSocialList}/>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default ShareScreen
