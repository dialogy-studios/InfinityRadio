import React from "react";
import {StackHeaderProps, StackNavigationProp} from "@react-navigation/stack";
import {TouchableOpacity, View} from "react-native";
import GoBackIcon from "../../../../resources/v1/icons/GoBackIcon";
import {SafeAreaView} from "react-native-safe-area-context";

interface Props {
    navigation: StackNavigationProp<any>
}

const ShareScreenHeader: React.FC<Props> = ({navigation}) => {
    return (
        <SafeAreaView
            style={[
                {
                    height: 50,
                    flexDirection: 'row'
                }
            ]}
        >
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
                    <GoBackIcon />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ShareScreenHeader
