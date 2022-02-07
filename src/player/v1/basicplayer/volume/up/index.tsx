import VolumeUpIcon from '../../../../../resources/v1/icons/VolumeUpIcon';
import React, {useCallback} from 'react';
import {Player} from '../../config/Context';
import LongPressTouchable from '../../../../../touchables/v1/LongPressTouchable';
import remoteConfig from "@react-native-firebase/remote-config";
import {StyleProp, ViewStyle} from "react-native";

interface Props {
  player: Player;
  style?: StyleProp<ViewStyle>
}

const VolumeUp: React.FC<Props> = ({player, style}) => {
  const doIncrease = useCallback(() => {
    player.actions.volume.increase();
  }, [player.actions.volume]);

  return (
    <LongPressTouchable
        style={style}
      onPress={() => {
        doIncrease();
      }}
      onLongPressTick={() => {
        doIncrease();
      }}
      onStartLongPress={() => {
          player.actions.volume.startLongPressing();
      }}
      onEndLongPress={() => {
          player.actions.volume.exitLongPressing();
      }}
    >
      <VolumeUpIcon size={remoteConfig().getNumber('volume_up_size')} color={remoteConfig().getString('volume_up_color')} />
    </LongPressTouchable>
  );
};

export default VolumeUp;
