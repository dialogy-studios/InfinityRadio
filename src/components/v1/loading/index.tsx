import {Image, View} from "react-native";
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
                        aspectRatio: 1.1
                    }
                ]}
                resizeMode={"contain"}
            />
        </View>
    )
}


export default LoadingWithGif;
