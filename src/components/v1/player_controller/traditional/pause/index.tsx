import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Player} from '../../../player/config/Context';
import {useSafeConfigContext} from "../../../../../firebase/v1/firestore/collection/configs";
import PauseIcon from "../../../../../resources/v1/icons/PauseIcon";

interface Props {
  player: Player;
}

const Pause: React.FC<Props> = ({player}) => {
    const config = useSafeConfigContext()
  return (
    <TouchableOpacity
        onPress={player.actions.pause}
        style={
            [
                {
                    marginHorizontal: 10
                }
            ]
        }
    >
      <PauseIcon size={config.state.pause.size} color={config.state.pause.color} />
    </TouchableOpacity>
  );
};

export default Pause;
