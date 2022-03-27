import React, {ReactNode, useCallback, useState} from "react";
import {ActivityIndicator, TouchableOpacity, View, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {ShareSingleOptions, Social as SocialShare} from "react-native-share";
import InstagramIcon from "../../../resources/v1/icons/InstagramIcon";
import TwitterIcon from "../../../resources/v1/icons/TwitterIcon";
import GoBackBtn from "../go_back_btn";
import {useSafeShareContext} from "../../../domain/share";

export enum Social {
    INSTAGRAM = 'instagram',
    TWITTER = 'twitter'
}

interface ShareSocialItemConfig {
    icon: Element,
}

interface Props {
    shareOptionList: Social[],
    onRequestURI: () => Promise<string | null>
}

enum UiState {
    LOADING,
    NORMAL,
    ERROR
}

function getShareOptionDataById(id: Social): ShareSocialItemConfig | null {
    const DEFAULT_ICON_SIZE = 64
    if (id == Social.INSTAGRAM) {
        return {
            icon: <InstagramIcon size={DEFAULT_ICON_SIZE} />,
        }
    } else if (id == Social.TWITTER) {
        return {
            icon: <TwitterIcon size={DEFAULT_ICON_SIZE} />,
        }
    } else {
        return null
    }
}

const ShareOptions: React.FC<Props> = ({shareOptionList, onRequestURI}) => {
    const [uiState, setUiState] = useState(UiState.NORMAL)
    const share = useSafeShareContext()

    const shareTwitter = () => {

    }

    const shareInstagram = useCallback(async () => {
        try {
            setUiState(UiState.LOADING)
            const stickImage = await onRequestURI()
            console.log(stickImage)
            if (stickImage == null) {
                setUiState(UiState.ERROR)
                return
            }
            const instagramConfig: ShareSingleOptions = {
                social: SocialShare.InstagramStories,
                backgroundBottomColor: '#fff',
                backgroundTopColor: '#000',
                stickerImage: stickImage
            }
            await share.actions.shareInstagram(instagramConfig)
            setUiState(UiState.NORMAL)
        } catch (error) {
            setUiState(UiState.ERROR)
        }
    }, [setUiState])

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

    const shareOptionById = useCallback((shareId: Social) => {
        const shareActionDict: {[id: string]: () => void} = {
            [Social.INSTAGRAM]: shareInstagram ,
            [Social.TWITTER]: shareTwitter,
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
                        flexDirection: 'row'
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
