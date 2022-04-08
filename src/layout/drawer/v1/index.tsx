import React, {useEffect, useState} from "react";
import {DrawerContentScrollView} from "@react-navigation/drawer";
import {View, Text, TouchableOpacity} from "react-native";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import Links from "../../../bottom/socialBottom/v1/links";
import {Link} from "../../../bottom/socialBottom/v1";
import LiveLabel from "../../../components/v1/player_controller/traditional/livelabel";
import DrawerLabel from "../../../components/v1/drawer_label";
import {useSafeShareContext} from "../../../domain/share";

const DEFAULT_SPACE = 8
const DEFAULT_MARGIN_HORIZONTAL = DEFAULT_SPACE * 4

const DrawerLayout: React.FC<any> = ({navigation}) => {
    const config = useSafeConfigContext()
    const share = useSafeShareContext()
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

            <TouchableOpacity
                style={[
                    {
                        marginTop: DEFAULT_SPACE * 4,
                        marginHorizontal: DEFAULT_MARGIN_HORIZONTAL
                    }
                ]}
                onPress={() => navigation.navigate('Main')}
            >
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            alignItems: 'center',
                        }
                    ]}
                >
                   <DrawerLabel>
                       Infinity Radio
                   </DrawerLabel>
                    <View
                        style={[
                            {
                                marginLeft: 10
                            }
                        ]}
                    >
                        <LiveLabel isLive={config.state.mainScreen.isLive}  variant={'light'}/>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    {
                        marginTop: DEFAULT_SPACE * 2,
                        marginHorizontal: DEFAULT_MARGIN_HORIZONTAL
                    }
                ]}
                onPress={() => {
                    share.actions.shareMail()
                }}
            >
                <DrawerLabel>
                    Contact Us
                </DrawerLabel>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

export default DrawerLayout
