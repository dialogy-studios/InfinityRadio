import React from "react";
import {ImageBackground, StatusBar, Text, View} from 'react-native';
import Centered from "../../../resources/v1/styles/view/Centered";
import TryAgainBtn from "../../../components/v1/try_again_btn";
interface Props {
    message: string,
    retryAction: (() => void) | null
}

const InternetConnectionErrorScreen: React.FC<Props> = ({message, retryAction}) => {
    return (
        <ImageBackground
            style={[
                {flex: 1},
            ]}
            source={require('../../../resources/v1/images/v1/background/background-1.jpg')}
        >
            <StatusBar barStyle={"light-content"} backgroundColor={'transparent'}  translucent={true}/>
            <ImageBackground
                style={[
                    {flex: 1},
                    Centered
                ]}
                source={require('../../../resources/v1/images/v1/internet_connection_error/internet-connection-error-msg.png')}
            >
                <View
                    style={[
                        {flex: 2}
                    ]}
                />
                <View
                    style={[
                        {flex: 1}
                    ]}
                >
                    <View
                        style={[
                            {marginTop: 5}
                        ]}
                    >
                        <Text style={[{color: 'white'}]}> { message }</Text>
                    </View>
                    {
                        retryAction != null && (
                            <TryAgainBtn
                                style={[
                                    {marginTop: 20}
                                ]}
                                onCLick={retryAction}
                            />
                        )
                    }
                </View>
            </ImageBackground>
        </ImageBackground>
    )
}

export default InternetConnectionErrorScreen;
