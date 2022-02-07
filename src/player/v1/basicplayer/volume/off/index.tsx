import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import VolumeOffIcon from '../../../../../resources/v1/icons/VolumeOffIcon';
import {Player} from '../../config/Context';
import remoteConfig from "@react-native-firebase/remote-config";

interface Props {
    player: Player;
    style?: StyleProp<ViewStyle>
}

const VolumeOff: React.FC<Props> = ({player, style}) => {
  return (
    <TouchableOpacity
        style={style}
        onPress={player.actions.mute}>
      <VolumeOffIcon size={remoteConfig().getNumber('volume_mute_size')} color={remoteConfig().getString('volume_mute_color')} />
    </TouchableOpacity>
  );
};

export default VolumeOff;
