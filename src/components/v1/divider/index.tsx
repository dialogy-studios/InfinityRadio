import React from "react";
import {View} from "react-native";

interface Props {

}

const Divider: React.FC<Props> = () => {
    return (
        <View
            style={[
                {
                    height: 1,
                    backgroundColor: 'gray',
                    flexDirection: "row"
                }
            ]}
        >
            <View  style={[{flex: 1}]}/>
        </View>
    )
}

export default Divider
