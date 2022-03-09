import React from "react";
import {ImageBackground, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import Centered from "../../../../resources/v1/styles/view/Centered";
import TryAgainBtn from "../../../../components/v1/try_again_btn";
interface Props {
    message: string,
    retryAction: () => void
}

const Error: React.FC<Props> = ({message, retryAction}) => {
    return (
       <ImageBackground
           style={[
               {flex: 1},
           ]}
           source={require('../../../../resources/v1/images/v1/background/background-1.jpg')}
       >
           <StatusBar barStyle={"light-content"} backgroundColor={'transparent'} />
           <ImageBackground
               style={[
                   {flex: 1},
                   Centered
               ]}
               source={require('../../../../resources/v1/images/v1/internet_connection_error/internet-connection-error-msg.png')}
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
                   <TryAgainBtn
                       onCLick={retryAction}
                   />
                   <View
                       style={[
                           {marginTop: 20}
                       ]}
                   >
                       <Text style={[{color: 'white'}]} > {message ? `Error message: ${message}` : ''}</Text>
                   </View>
               </View>
           </ImageBackground>
       </ImageBackground>
    )
}

export default Error;
