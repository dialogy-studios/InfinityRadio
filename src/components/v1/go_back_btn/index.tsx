import {TouchableOpacity, Text, View} from "react-native";
import React from "react";

interface Props {
    onPress?: () => void
}

const GoBackBtn: React.FC<Props> = ({onPress}) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={[
                    {
                        flexDirection: 'row',
                    }
                ]}
            >
                <GoBackBtn />
                <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}

export default GoBackBtn
