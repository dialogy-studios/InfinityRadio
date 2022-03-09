import {Image, View} from "react-native";
import React from "react";
import FlexRow from "../../../../resources/v1/styles/view/FlexRow";
import Retry from "../../../../resources/v1/icons/Retry";

const IntentConnectionErrorMsg: React.FC<any> = () => {
    return (
        <Image
            style={[{
                height: 400,
                flex: 1,
                resizeMode: 'contain',
                backgroundColor: 'pink'
            }]}
            source={require('../../../../resources/v1/images/v1/internet_connection_error/internet-connection-error-msg.png')}
            resizeMode={"cover"}
        >

        </Image>
    )
}

export default IntentConnectionErrorMsg
