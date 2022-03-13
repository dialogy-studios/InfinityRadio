import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {Player} from '../../../../player/config/Context';
import {useSafeConfigContext} from "../../../../../../firebase/v1/firestore/collection/configs";
import VolumeUpIcon from "../../../../../../resources/v1/icons/VolumeUpIcon";
import VolumeOffIcon from "../../../../../../resources/v1/icons/VolumeOffIcon";

interface Props {
    player: Player;
    style?: StyleProp<ViewStyle>
}

const VolumeOff: React.FC<Props> = ({player, style}) => {
    const config = useSafeConfigContext()
    const iconSize = config.state.volumeMute.size
    const iconColor = config.state.volumeMute.color
  return (
    <TouchableOpacity
        style={style}
        onPress={player.actions.mute}>
        {
            player.state.muted ?
                <VolumeUpIcon size={iconSize} color={iconColor} />
                :
                <VolumeOffIcon size={iconSize} color={iconColor} />
        }

    </TouchableOpacity>
  );
};

export default VolumeOff;
