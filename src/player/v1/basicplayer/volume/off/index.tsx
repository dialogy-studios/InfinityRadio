import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import VolumeOffIcon from '../../../../../resources/v1/icons/VolumeOffIcon';
import {Player} from '../../config/Context';
import remoteConfig from "@react-native-firebase/remote-config";
import VolumeUpIcon from "../../../../../resources/v1/icons/VolumeUpIcon";
import {useSafeConfigContext} from "../../../../../firebase/v1/firestore/collection/configs";

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
