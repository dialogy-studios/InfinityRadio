import React from "react";
import DeviceInfo from "react-native-device-info";
import {TouchableOpacity, View} from "react-native";
import MenuIcon from "../../resources/v1/icons/MenuIcon";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {useNavigation} from "@react-navigation/native";

interface Props {

}

const HeaderLayout: React.FC<Props> = () => {
    const drawer: DrawerNavigationProp<any, any> = useNavigation()

    return (
        <View
            style={[
                {
                    flex: 1,
                }
            ]}
        >
            <TouchableOpacity
                style={[
                    {
                        justifyContent: 'center',
                        height: 50,
                        width: 50
                    }
                ]}
                onPress={() => drawer.openDrawer()}
            >
                <MenuIcon size={36} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderLayout
