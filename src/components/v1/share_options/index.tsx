import React, {ReactNode, useCallback, useState} from "react";
import {
    ActivityIndicator,
    FlatList,
    Platform,
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Share, {
    ShareAsset,
    ShareOptions as ShareOpenOptions,
    ShareSingleOptions,
    Social,
    Social as SocialShare
} from "react-native-share";
import InstagramIcon from "../../../resources/v1/icons/InstagramIcon";
import TwitterIcon from "../../../resources/v1/icons/TwitterIcon";
import GoBackBtn from "../go_back_btn";
import {useSafeShareContext} from "../../../domain/share";
import WhatsAppIcon from "../../../resources/v1/icons/WhatsAppIcon";
import FacebookIcon from "../../../resources/v1/icons/FacebookIcon";
import TelegramIcon from "../../../resources/v1/icons/TelegramIcon";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import MoreIcon from "../../../resources/v1/icons/MoreIcon";
import CopyLinkIcon from "../../../resources/v1/icons/CopyLinkIcon";
import Clipboard, {useClipboard} from "@react-native-community/clipboard";
import Toast from "react-native-toast-message";
import Centered from "../../../resources/v1/styles/view/Centered";
import ShareButtonRenderer from "../../../layout/share_button_container";

export enum SocialType {
    INSTAGRAM = 'Instagram',
    TWITTER = 'Twitter',
    WHATSAPP = 'Whatsapp',
    FACEBOOK = 'Facebook',
    TELEGRAM = 'Telegram',
    COPY = 'Copy',
    MORE = 'More'
}

interface Props {
    onRequestURI: () => Promise<string | null>,
    withGradient?: boolean
}

enum UiState {
    LOADING,
    NORMAL,
    ERROR
}

const DEFAULT_ICON_SIZE = 52

const ShareOptions: React.FC<Props> = ({ onRequestURI, withGradient = false}) => {
    const [uiState, setUiState] = useState(UiState.NORMAL)
    const share = useSafeShareContext()

    const shareInstagram = useCallback(async () => {
        try {
            setUiState(UiState.LOADING)
            const stickerImage = await onRequestURI()
            if (stickerImage == null) {
                setUiState(UiState.ERROR)
                return
            }
            const instagramConfig: ShareSingleOptions = {
                social: SocialShare.InstagramStories,
                backgroundBottomColor: 'white',
                backgroundTopColor: 'black',
                attributionURL: 'https://www.infinityradioireland.com/',
                stickerImage: stickerImage
            }
            await share.actions.shareInstagram(instagramConfig)
            setUiState(UiState.NORMAL)
        } catch (error) {
            setUiState(UiState.ERROR)
        }
    }, [setUiState])

    const copyMessageToClipboard = () => {
        Clipboard.setString(share.actions.getShareMsg())
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'The link was copied to clipboard!'
        })
    }

    const shareMessage = () => {
        share.actions.shareMessage()
    }

    const renderLoading = () => {
        return (
            <View
                style={[
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}
            >
                <ActivityIndicator
                    size={"large"}
                    color={'#fff'}
                />
            </View>
        )
    }

    const renderError = () => {
        return (
            <View
                style={[
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }
                ]}
            >
                <Text
                    style={[
                        {
                            color: 'white',
                            fontSize: 24
                        }
                    ]}
                >
                    Oops, something went wrong.
                </Text>
                <View
                    style={[
                        {
                            marginTop: 24
                        }
                    ]}
                >
                    <GoBackBtn
                        onPress={() => setUiState(UiState.NORMAL)}
                    />
                </View>
            </View>
        )
    }

    const renderNormal = () => {
        return (
            <View
                style={[
                    {
                        flex: 1,
                        paddingVertical: 10,
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    }
                ]}
            >
                <View
                    style={[
                        {
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <ShareButtonRenderer
                        onPress={shareInstagram}
                        icon={() => (<InstagramIcon size={DEFAULT_ICON_SIZE} circleColor={'white'} logoColor={'black'} variant={'circle'} /> )}
                        label={SocialType.INSTAGRAM}
                    />
                    <ShareButtonRenderer
                        onPress={shareInstagram}
                        icon={() => (<FacebookIcon size={DEFAULT_ICON_SIZE} circleColor={'white'} logoColor={'black'} variant={'circle'} /> )}
                        label={SocialType.FACEBOOK}
                    />
                    <ShareButtonRenderer
                        onPress={shareInstagram}
                        icon={() => (<TelegramIcon size={DEFAULT_ICON_SIZE} circleColor={'white'} logoColor={'black'} variant={'circle'} /> )}
                        label={SocialType.TELEGRAM}
                    />
                </View>
                <View
                    style={[
                        {
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <ShareButtonRenderer
                        onPress={copyMessageToClipboard}
                        icon={() => (<CopyLinkIcon size={DEFAULT_ICON_SIZE} circleColor={'white'} linkColor={'black'} variant={'circle'} /> )}
                        label={SocialType.COPY}
                    />
                    <ShareButtonRenderer
                        onPress={shareMessage}
                        icon={() => (<MoreIcon size={DEFAULT_ICON_SIZE} circleColor={'white'} dotColor={'black'} variant={"circle"} />)}
                        label={SocialType.MORE}
                    />
                    <ShareButtonRenderer
                        onPress={shareInstagram}
                        icon={() => <View style={[{height: DEFAULT_ICON_SIZE, width: DEFAULT_ICON_SIZE}]} />}
                        label={""}
                    />
                </View>
            </View>
        )
    }

    const render = (): ReactNode => {
        const rendererByState: {[uiState: number]: () => ReactNode} = {
            [UiState.LOADING]: renderLoading,
            [UiState.ERROR]: renderError,
            [UiState.NORMAL]: renderNormal
        }
        const renderer = rendererByState[uiState]
        if (renderer == null) return null
        return renderer()
    }

    if (withGradient) {
        return (
            <LinearGradient
                style={[
                    {
                        flex: 1
                    }
                ]}
                colors={[
                    "#000",
                    "#fff"
                ]}
            >
                {render()}
            </LinearGradient>
        )
    }

    return render()
}

export default ShareOptions
