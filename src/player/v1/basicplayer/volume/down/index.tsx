import React, {useCallback} from 'react';
import VolumeDownIcon from '../../../../../resources/v1/icons/VolumeDownIcon';
import {Player} from '../../config/Context';
import LongPressTouchable from '../../../../../touchables/v1/LongPressTouchable';
import {StyleProp, ViewStyle} from "react-native";
import {useSafeConfigContext} from "../../../../../firebase/v1/firestore/collection/configs";

interface Props {
    player: Player;
    style?: StyleProp<ViewStyle>
}

const VolumeDown: React.FC<Props> = ({player, style}) => {
    const config = useSafeConfigContext()

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
      <VolumeDownIcon size={config.state.volumeDown.size} color={config.state.volumeDown.color} />
    </LongPressTouchable>
  );
};

export default VolumeDown;
