import React, {ReactNode, useCallback, useState} from "react";
import {ActivityIndicator, Platform, StyleProp, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
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

export enum SocialType {
    INSTAGRAM = 'Instagram',
    TWITTER = 'Twitter',
    WHATSAPP = 'Whatsapp',
    FACEBOOK = 'Facebook',
    TELEGRAM = 'Telegram'
}

interface ShareSocialItemConfig {
    icon: Element,
}

interface Props {
    shareOptionList: SocialType[],
    onRequestURI: () => Promise<string | null>,
    withGradient?: boolean
}

enum UiState {
    LOADING,
    NORMAL,
    ERROR
}

const DEFAULT_ICON_SIZE = 48
const DEFAULT_MARGIN_HORIZONTAL = 8
const DEFAULT_SHARE_MESSAGE = "Listen infinity radio! https://play.google.com/store?hl=pt_BR&gl=US"
const DEFAULT_SHARE_TITLE = ""

function getShareOptionDataById(id: SocialType): ShareSocialItemConfig | null {
    const shareOptionConfigDict: {[socialType: string]: ShareSocialItemConfig} = {
        [SocialType.INSTAGRAM]: {
            icon:  <InstagramIcon
                variant={'circle'}
                logoColor={"black"}
                circleColor={'white'}
                size={DEFAULT_ICON_SIZE} />
        },
        [SocialType.TWITTER]: {
            icon: <TwitterIcon
                variant={"circle"}
                logoColor={"black"}
                circleColor={"white"}
                size={DEFAULT_ICON_SIZE} />,
        },
        [SocialType.WHATSAPP]:  {
            icon: <WhatsAppIcon
                variant={'circle'}
                size={DEFAULT_ICON_SIZE*0.8}
            />,
        },
        [SocialType.FACEBOOK]: {
            icon: <FacebookIcon
                variant={"circle"}
                size={DEFAULT_ICON_SIZE} />,
        },
        [SocialType.TELEGRAM]: {
            icon: <TelegramIcon
                variant={"circle"}
                circleColor={'white'}
                logoColor={'black'}
                logoShadowColor={'#636363'}
                size={DEFAULT_ICON_SIZE} />
        }
    }
    const shareOptionConfig = shareOptionConfigDict[id]
    if (shareOptionConfig == null) return null
    else return shareOptionConfig
}

const ShareOptions: React.FC<Props> = ({shareOptionList, onRequestURI, withGradient = false}) => {
    const [uiState, setUiState] = useState(UiState.NORMAL)
    const share = useSafeShareContext()
    const config = useSafeConfigContext()

    const shareOptionTextStyle: StyleProp<TextStyle> = {
        color: 'white',
        fontWeight: 'bold',
        alignContent: 'center'
    }

    const getMessageByPlatform = () => Platform.OS == "ios" ? config.state.share.url_ios : config.state.share.url_android

    const getMsgShareConfig = (message?: string, url?: string) => {
        return {
            message: message != undefined ? message : DEFAULT_SHARE_MESSAGE,
            title: url != undefined ? url : DEFAULT_SHARE_TITLE,
            url: getMessageByPlatform()
        }
    }

    const shareDefaultMsg = async (message?: string, url?: string) => {
        const shareConfig: ShareOpenOptions = getMsgShareConfig()
        await Share.open(shareConfig)
    }

    const shareTwitter = async () => {
        await shareDefaultMsg(
            config.state.share.twitter_msg,
            getMessageByPlatform()
        )
    }

    const shareWhatsapp = async () => {
        await shareDefaultMsg(
            config.state.share.whatsapp_msg,
            getMessageByPlatform()
        )
    }

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

    const shareTelegram = async () => {
        const telegramConfig: ShareSingleOptions = {
            title: DEFAULT_SHARE_TITLE,
            message: config.state.share.telegram_msg,
            social: Social.Telegram,
        }
        await Share.open(telegramConfig)
    }

    const shareFacebook = async () => {
        try {
            setUiState(UiState.LOADING)
            const stickerImage = await onRequestURI()
            if (stickerImage == null) {
                setUiState(UiState.ERROR)
                return
            }
            const facebookConfig: ShareSingleOptions = {
                social: SocialShare.FacebookStories,
                backgroundBottomColor: 'white',
                backgroundTopColor: 'black',
                stickerImage: stickerImage,
                appId: config.state.general.facebook_app_id,
                method: ShareAsset.StickerImage
            }
            await share.actions.shareInstagram(facebookConfig)
            setUiState(UiState.NORMAL)
        } catch (error) {
            setUiState(UiState.ERROR)
        }
    }

    const renderShareOptions = () => {
        return shareOptionList
            .map((shareId) => {
                const shareItem = getShareOptionDataById(shareId)
                if (shareItem == null) return null
                return (
                    <View
                        key={shareId}
                        style={[
                            Centered,
                            {
                                marginBottom: DEFAULT_MARGIN_HORIZONTAL
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={[{
                                marginBottom: 10,
                                marginHorizontal: DEFAULT_MARGIN_HORIZONTAL * 4,
                            }]}
                            key={`${shareId}-btn`}
                            onPress={() => shareOptionById(shareId)}
                        >
                            {shareItem.icon}
                        </TouchableOpacity>
                        <Text style={[
                            shareOptionTextStyle
                        ]}>{shareId}</Text>
                    </View>
                )
            })
    }

    const shareOptionById = useCallback((shareId: SocialType) => {
        const shareActionDict: {[id: string]: () => void} = {
            [SocialType.INSTAGRAM]: shareInstagram,
            [SocialType.TWITTER]: shareTwitter,
            [SocialType.WHATSAPP]: shareWhatsapp,
            [SocialType.TELEGRAM]: shareTelegram,
            [SocialType.FACEBOOK]: shareFacebook,

        }
        const action = shareActionDict[shareId]
        if (action != null) {
            action()
        }
    }, [shareInstagram, shareTwitter])

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
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: 10
                    }
                ]}
            >
                {renderShareOptions()}
                <View
                    style={[
                        {
                            marginHorizontal: DEFAULT_MARGIN_HORIZONTAL * 4,
                        },
                        Centered
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            Clipboard.setString(share.actions.getShareMsg())
                            Toast.show({
                                type: 'success',
                                text1: 'Success',
                                text2: 'The link was copied to clipboard!'
                            })
                        }}
                    >
                        <CopyLinkIcon
                            variant={"circle"}
                            size={DEFAULT_ICON_SIZE * .8}
                        />
                    </TouchableOpacity>
                    <Text
                        style={
                            [
                                {
                                    marginTop: DEFAULT_MARGIN_HORIZONTAL
                                },
                                shareOptionTextStyle,
                            ]
                        }
                    >
                        Copy
                    </Text>
                </View>
                <View
                    style={[
                        {
                            marginHorizontal: DEFAULT_MARGIN_HORIZONTAL * 4
                        },
                        Centered
                    ]}
                >
                    <TouchableOpacity
                        onPress={() => {
                            share.actions.shareMessage()
                        }}
                    >
                        <MoreIcon
                            variant={"circle"}
                            size={DEFAULT_ICON_SIZE}
                        />
                    </TouchableOpacity>
                    <Text
                        style={[
                            shareOptionTextStyle,
                            {
                                marginTop: DEFAULT_MARGIN_HORIZONTAL
                            }
                        ]}
                    >
                        More
                    </Text>
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
