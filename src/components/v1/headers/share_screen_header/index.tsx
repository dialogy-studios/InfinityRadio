import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {TouchableOpacity, View} from "react-native";
import GoBackIcon from "../../../../resources/v1/icons/GoBackIcon";

interface Props {
    navigation: StackNavigationProp<any>
}

const ShareScreenHeader: React.FC<Props> = ({navigation}) => {
    return (
        <View
            style={[
                {
                    marginLeft: 20,
                }
            ]}
        >
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <GoBackIcon variant={"ios"} />
            </TouchableOpacity>
        </View>
    )
}

export default ShareScreenHeader
