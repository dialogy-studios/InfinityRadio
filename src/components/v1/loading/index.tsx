import {Image, Platform, View} from "react-native";
import React from "react";

const LoadingWithGif: React.FC<any> = () => {
    return (
        <View
            style={[{
                backgroundColor: 'black',
                flex: 1
            }]}
        >
            <Image
                source={require('../../../resources/v1/gif/loading.gif')}
                style={[
                    {
                        flex: 1,
                        resizeMode: 'cover',
                        aspectRatio: Platform.OS == 'ios' ? .7 : .9
                    }
                ]}
                resizeMode={"cover"}
            />
        </View>
    )
}


export default LoadingWithGif;
