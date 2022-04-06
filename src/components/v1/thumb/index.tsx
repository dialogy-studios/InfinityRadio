import React from "react";
import {Image, Text, View} from "react-native";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import TitleLabel from "../title_label";
import DescriptionLabel from "../description_label";

type Variants = 'thumb-only' | 'thumb-with-title' | 'thumb-with-description' | 'thumb-with-title-and-description' | 'share-thumb'

interface Props {
    variant: Variants,
    image?: string,
    onLoadEnd?: () => void
}

const Thumb: React.FC<Props> = (props) => {
    const config = useSafeConfigContext()

    const renderPoster = () => {
        return (
            <Image
                style={{
                    // height: 300,
                    flex: 1,
                    // backgroundColor: 'red'
                }}
                onLoadEnd={props.onLoadEnd}
                source={{uri: props.image != null ? props.image : config.state.mainScreen.player_poster}}
                resizeMode={'stretch'}
            />
        )
    }

    const renderLabels = () => {
        if (props.variant == "thumb-only") return null
        return (
            <View
                style={[
                    {
                        // paddingVertical: 25,
                        // backgroundColor: 'gray'
                    }
                ]}
            >
                {renderTitle()}
                {renderDescription()}
            </View>
        )
    }

    const renderTitle = () => {
        if (props.variant != "thumb-with-title" && props.variant != "thumb-with-title-and-description") return null
        return (
            <TitleLabel />
        )
    }

    const renderDescription = () => {
        if (props.variant != "thumb-with-description" && props.variant != "thumb-with-title-and-description") return null
        return (
            <DescriptionLabel size={20}/>
        )
    }

    if (props.variant == "share-thumb") {
        return (
            <View
                style={[
                    {
                        flex: 1
                    }
                ]}
            >
                <Thumb
                    variant={"thumb-only"}
                    image={config.state.share.poster}
                />

                <View
                    style={[
                        {
                            marginTop: 20,
                            backgroundColor: 'transparent',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <TitleLabel size={32}/>
                    <DescriptionLabel size={28} />
                </View>
            </View>
        )
    }

    return (
        <View
            style={[
                {
                    flex: 1,
                    // backgroundColor: 'pink'
                }
            ]}
        >
            {renderPoster()}
            {renderLabels()}
        </View>
    )
}

export default Thumb
