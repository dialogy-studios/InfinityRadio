import {TouchableOpacity, Text, View} from "react-native";
import React from "react";
import GoBackIcon from "../../../resources/v1/icons/GoBackIcon";

interface Props {
    onPress?: () => void
}

const GoBackBtn: React.FC<Props> = ({onPress}) => {
    return (
        <View
        >
            <TouchableOpacity
                onPress={onPress}
                style={[
                    {
                        flexDirection: 'row',
                    }
                ]}
            >
                <GoBackIcon />
                <Text style={[
                    {
                        fontSize: 18,
                        color: 'white',
                    }
                ]}>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GoBackBtn
