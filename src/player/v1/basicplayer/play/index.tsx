import React from 'react';
import {TouchableOpacity} from 'react-native';
import PlayIcon from '../../../../resources/v1/icons/PlayIcon';
import {Player} from '../config/Context';
import remoteConfig from "@react-native-firebase/remote-config";

interface Props {
  player: Player;
}

const Play: React.FC<Props> = ({player}) => {
  return (
    <TouchableOpacity onPress={player.actions.play}>
      <PlayIcon size={remoteConfig().getNumber('play_size')} color={remoteConfig().getString('play_color')} />
    </TouchableOpacity>
  );
};

export default Play;
