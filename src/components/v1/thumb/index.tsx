import React from "react";
import {Image, Text, View} from "react-native";
import {useSafeConfigContext} from "../../../firebase/v1/firestore/collection/configs";
import TitleLabel from "../title_label";
import DescriptionLabel from "../description_label";

type Variants = 'thumb-only' | 'thumb-with-title' | 'thumb-with-description' | 'thumb-with-title-and-description' | 'share-thumb'

interface Props {
    variant: Variants,
    onLoadEnd?: () => void
}

const Thumb: React.FC<Props> = (props) => {
    const config = useSafeConfigContext()

    const renderPoster = () => {
        return (
            <Image
                style={{
                    flex: 1
                }}
                onLoadEnd={props.onLoadEnd}
                source={{uri: config.state.mainScreen.player_poster}}
                resizeMode={'contain'}
            />
        )
    }

    const renderLabels = () => {
        if (props.variant == "thumb-only") return null
        return (
            <View
                style={[
                    {
                        paddingVertical: 25,
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
            <DescriptionLabel />
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
                />

                <View
                    style={[
                        {
                            marginTop: 20,
                            // backgroundColor: 'pink',
                            alignItems: 'center'
                        }
                    ]}
                >
                    <TitleLabel/>
                    <DescriptionLabel/>
                </View>
            </View>
        )
    }

    return (
        <>
            {renderPoster()}
            {renderLabels()}
        </>
    )
}

export default Thumb
