import React, {useCallback} from 'react';
import VolumeDownIcon from '../../../../../resources/v1/icons/VolumeDownIcon';
import {Player} from '../../config/Context';
import LongPressTouchable from '../../../../../touchables/v1/LongPressTouchable';
import remoteConfig from "@react-native-firebase/remote-config";
import {StyleProp, ViewStyle} from "react-native";

interface Props {
    player: Player;
    style?: StyleProp<ViewStyle>
}

const VolumeDown: React.FC<Props> = ({player, style}) => {
  const doDecrease = useCallback(() => {
    player.actions.volume.decrease();
  }, [player.actions.volume]);
  return (
    <LongPressTouchable
        style={style}
        onPress={doDecrease}
        onLongPressTick={doDecrease}
        onStartLongPress={() => {
          player.actions.volume.startLongPressing();
        }}
        onEndLongPress={() => {
          player.actions.volume.exitLongPressing();
        }}
    >
      <VolumeDownIcon size={remoteConfig().getNumber('volume_down_size')} color={remoteConfig().getString('volume_down_color')} />
    </LongPressTouchable>
  );
};

export default VolumeDown;
