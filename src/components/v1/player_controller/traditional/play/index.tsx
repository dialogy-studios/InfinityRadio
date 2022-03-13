import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Player} from '../../../player/config/Context';
import {useSafeConfigContext} from "../../../../../firebase/v1/firestore/collection/configs";
import PlayIcon from "../../../../../resources/v1/icons/PlayIcon";

interface Props {
  player: Player;
}

const Play: React.FC<Props> = ({player}) => {
    const config = useSafeConfigContext()
  return (
    <TouchableOpacity
        onPress={player.actions.play}
        style={[
            {
                marginHorizontal: 10
            }
        ]}
    >
      <PlayIcon size={config.state.play.size} color={config.state.play.color} />
    </TouchableOpacity>
  );
};

export default Play;
