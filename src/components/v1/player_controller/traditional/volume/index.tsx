import React from 'react';
import VolumeUp from './up';
import VolumeOff from './off';
import VolumeDown from './down';
import {Player} from '../../../player/config/Context';

interface Props {
  player: Player;
}

const VolumeButtons: React.FC<Props> = ({player}) => {
  return (
      <>
          <VolumeDown style={[{marginEnd: 15}]} player={player} />
          <VolumeUp style={[{marginEnd: 10}]} player={player} />
          <VolumeOff style={[{marginEnd: 15}]} player={player} />
      </>
  );
};

export default VolumeButtons;
