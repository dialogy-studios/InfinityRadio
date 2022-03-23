import React, {useCallback} from 'react';
import {Player} from '../../../../player/config/Context';
import {StyleProp, ViewStyle} from "react-native";
import {useSafeConfigContext} from "../../../../../../firebase/v1/firestore/collection/configs";
import LongPressTouchable from "../../../../../../touchables/v1/LongPressTouchable";
import VolumeUpIcon from "../../../../../../resources/v1/icons/VolumeUpIcon";

interface Props {
  player: Player;
  style?: StyleProp<ViewStyle>
}

const VolumeUp: React.FC<Props> = ({player, style}) => {
    const config = useSafeConfigContext()

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
      <VolumeUpIcon size={config.state.volumeUp.size} color={config.state.volumeUp.color} />
    </LongPressTouchable>
  );
};

export default VolumeUp;
