import React, {ReactNode, useCallback, useState} from "react";
import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";
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

export enum SocialType {
    INSTAGRAM = 'instagram',
    TWITTER = 'twitter',
    WHATSAPP = 'whatsapp',
    FACEBOOK = 'facebook',
    TELEGRAM = 'telegram'
}

interface ShareSocialItemConfig {
    icon: Element,
}

interface Props {
    shareOptionList: SocialType[],
    onRequestURI: () => Promise<string | null>
}

enum UiState {
    LOADING,
    NORMAL,
    ERROR
}

const DEFAULT_ICON_SIZE = 64
const DEFAULT_SHARE_MESSAGE = "Listen infinity radio! https://play.google.com/store?hl=pt_BR&gl=US"
const DEFAULT_SHARE_TITLE = ""
function getShareOptionDataById(id: SocialType): ShareSocialItemConfig | null {
    const shareOptionConfigDict: {[socialType: string]: ShareSocialItemConfig} = {
        [SocialType.INSTAGRAM]: {
            icon: <InstagramIcon size={DEFAULT_ICON_SIZE} />,
        },
        [SocialType.TWITTER]: {
            icon: <TwitterIcon size={DEFAULT_ICON_SIZE} />,
        },
        [SocialType.WHATSAPP]:  {
            icon: <WhatsAppIcon size={DEFAULT_ICON_SIZE} />,
        },
        [SocialType.FACEBOOK]: {
            icon: <FacebookIcon size={DEFAULT_ICON_SIZE} />,
        },
        [SocialType.TELEGRAM]: {
            icon: <TelegramIcon size={DEFAULT_ICON_SIZE} />
        }
    }
    const shareOptionConfig = shareOptionConfigDict[id]
    if (shareOptionConfig == null) return null
    else return shareOptionConfig
}

const ShareOptions: React.FC<Props> = ({shareOptionList, onRequestURI}) => {
    const [uiState, setUiState] = useState(UiState.NORMAL)
    const share = useSafeShareContext()

    const getMsgShareConfig = () => {
        return {
            message: DEFAULT_SHARE_MESSAGE,
            title: DEFAULT_SHARE_TITLE,
            url: "https://play.google.com/store?hl=pt_BR&gl=US"
        }
    }

    const shareDefaultMsg = async () => {
        const shareConfig: ShareOpenOptions = getMsgShareConfig()
        await Share.open(shareConfig)
    }

    const shareTwitter = async () => {
        await shareDefaultMsg()
    }

    const shareWhatsapp = async () => {
        await shareDefaultMsg()
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
            message: DEFAULT_SHARE_MESSAGE,
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
                appId: "295287136078900",
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
                    <TouchableOpacity
                        key={`${shareId}-btn`}
                        onPress={() => shareOptionById(shareId)}
                    >
                        {shareItem.icon}
                    </TouchableOpacity>
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
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        marginTop: 10
                    }
                ]}
            >
                {renderShareOptions()}
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

export default ShareOptions