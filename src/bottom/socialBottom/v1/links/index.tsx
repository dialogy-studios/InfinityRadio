import React, {ReactElement} from "react";
import {Image, TouchableOpacity} from "react-native";
import LinkEffect from "../../../../styles/images/v1/config/LinkEffect";
import {Link} from "../index";
import MarginEnd10 from "../../../../styles/margins/MarginEnd10";
import openLink from "./openUrl";

interface Props {
    linkList: Link[]
}

const Links: (props: Props) => any = ({linkList}) => {
    return linkList
        .map((link) => {
            return (
                <TouchableOpacity
                    onPress={() => openLink(link.url, link.browserColor)}
                    style={
                        [
                            {
                                marginHorizontal: 15
                            }
                        ]
                    } key={link.icon}>
                    <Image
                        style={[
                            LinkEffect,
                            {
                                width: link.size,
                                height: link.size
                            }
                        ]}
                        source={{
                            uri: link.icon,
                        }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity>
            )
        })
}

export default Links;
