import React from 'react';
import {TouchableOpacity} from 'react-native';
import PauseIcon from '../../../../resources/v1/icons/PauseIcon';
import {Player} from '../config/Context';
import remoteConfig from "@react-native-firebase/remote-config";

interface Props {
  player: Player;
}

const Pause: React.FC<Props> = ({player}) => {
  return (
    <TouchableOpacity onPress={player.actions.pause}>
      <PauseIcon size={remoteConfig().getNumber("pause_size")} color={remoteConfig().getString("pause_color")} />
    </TouchableOpacity>
  );
};

export default Pause;
