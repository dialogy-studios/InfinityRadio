import HeaderBasic from "../../../../header/v1/HeaderBasic";
import TraditionalPlayerController from "../../player_controller/traditional";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {Animated, Dimensions, TouchableOpacity, View, Text} from "react-native";
import TimingAnimationConfig = Animated.TimingAnimationConfig;
import DeviceInfo from "react-native-device-info";
import LiveLabel from "../../player_controller/traditional/livelabel";
import {useSafeConfigContext} from "../../../../firebase/v1/firestore/collection/configs";
import MenuIcon from "../../../../resources/v1/icons/MenuIcon";
import {useNavigation} from "@react-navigation/native";
import {DrawerNavigationProp} from "@react-navigation/drawer/src/types";
import {useShare} from "../../../../domain/share";
import {getBase64} from "../../../../domain/blob";
import {ShareOptions} from "react-native-share/src/types";
import {useArtist} from "../../../../domain/artist";
import ShareIcon from "../../../../resources/v2/ShareIcon";

interface Props {}
interface TraditionalTemplateMethods {
    fade: (config: TimingAnimationConfig, autoStart: boolean) => Animated.CompositeAnimation | null
}

const DEFAULT_MARGIN_HORIZONTAL = 16

const TraditionalTemplate = forwardRef<TraditionalTemplateMethods, Props>((props, ref) => {
    const config = useSafeConfigContext()
    const share = useShare()
    const artist = useArtist()
    const opacity = useRef(new Animated.Value(1)).current
    const drawer: DrawerNavigationProp<any, any> = useNavigation()
    const screenDimensions = {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width
    }

    useImperativeHandle(ref, () => ({
        fade: (config: TimingAnimationConfig, autoStart: boolean): Animated.CompositeAnimation | null => {
            const animation = Animated
                .timing(opacity, config)
            if (autoStart) {
                animation.start()
                return null
            } else {
                return animation
            }
        }
    }))

    return (
        <Animated.View
            style={[{
                height: DeviceInfo.hasNotch() ? screenDimensions.height - 50 : screenDimensions.height-100,
                width: screenDimensions.width,
                position: 'absolute',
                opacity,
                zIndex: opacity
                    .interpolate({
                        inputRange: [0, 1],
                        outputRange: [-999, 999]
                    })
            }]}
        >
            <View
                style={[
                    {
                        marginHorizontal: DEFAULT_MARGIN_HORIZONTAL,
                        marginTop: 30
                    }
                ]}
            >
                <TouchableOpacity
                    onPress={() => drawer.openDrawer()}
                >
                    <MenuIcon />
                </TouchableOpacity>
            </View>
            <View
                style={[
                    {
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}
            >
                <HeaderBasic/>
                <View
                    style={[
                        {
                            paddingVertical: 10
                        }
                    ]}
                >
                    <LiveLabel isLive={config.state.mainScreen.isLive} variant={'dark'} />
                </View>
            </View>
            <View
                style={[
                    {
                        flex: 1,
                        marginHorizontal: DEFAULT_MARGIN_HORIZONTAL,
                        // backgroundColor: 'gray'
                    }
                ]}
            >
                <TraditionalPlayerController/>
            </View>
        </Animated.View>
    )
})

export default TraditionalTemplate
