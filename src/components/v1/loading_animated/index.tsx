import {Animated, Dimensions, Image, ImageBackground, StatusBar, StyleProp, View, ViewStyle} from "react-native";
import React, {useEffect, useRef} from "react";
import Centered from "../../../resources/v1/styles/view/Centered";
import Dots from "../dots_animation";

const LoadingAnimated: React.FC<any> = () => {

    return (
        <ImageBackground
            style={[
                {
                   flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }
            ]}
            source={require('../../../resources/v1/images/v1/background/background-1.jpg')}
        >
            <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'}/>
            <Image
                source={require('../../../resources/v1/images/v1/loading/loading.png')}
                style={[
                    {
                        height: 100,
                        width: undefined,
                    }
                ]}
                resizeMode="contain"
            />
            <View
                style={[
                    {
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                ]}
            >
                <Dots />
            </View>
        </ImageBackground>
    )
}

export default LoadingAnimated;
