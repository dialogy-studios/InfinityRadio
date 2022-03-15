import React, {useEffect, useState} from "react";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {View, Text, TouchableOpacity} from "react-native";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import Links from "../../../../bottom/socialBottom/v1/links";
import {Link} from "../../../../bottom/socialBottom/v1";
import LiveLabel from "../../player_controller/traditional/livelabel";

const DrawerItemContainer: React.FC<any> = ({children}) => {
    return (
        <View
            style={[
                {
                    margin: 30
                }
            ]}
        >
            {children}
        </View>
    )
}

const Drawer: React.FC<any> = ({navigation}) => {
    const config = useSafeConfigContext()
    const [linkList, setLinkList] = useState<Link[]>([])

    useEffect(() => {
        try {
            const list: Link[] = JSON.parse(config.state.mainScreen.link_list)
            setLinkList(list)
        } catch (error) {

        }
    }, [config.state.mainScreen.link_list])

    return (
        <DrawerContentScrollView>
            <View style={[{flexDirection: 'row'}]}>
                <View style={[{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}]}>
                    <Links linkList={linkList} />
                </View>
            </View>

            <DrawerItemContainer>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main')}
                >
                    <View
                        style={[
                            {
                                flexDirection: 'row'
                            }
                        ]}
                    >
                        <Text
                            style={[
                                {
                                    fontSize: 18
                                }
                            ]}
                        >
                            Infinity Radio
                        </Text>
                        <LiveLabel isLive={config.state.mainScreen.isLive} />
                    </View>
                </TouchableOpacity>
            </DrawerItemContainer>

        </DrawerContentScrollView>
    )
}

export default Drawer
