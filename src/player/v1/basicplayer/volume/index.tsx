import React from 'react';
import VolumeUp from './up';
import VolumeOff from './off';
import VolumeDown from './down';
import {Player} from '../config/Context';
import {View} from "react-native";
import FlexRow from "../../../../resources/v1/styles/view/FlexRow";

interface Props {
  player: Player;
}

const VolumeButtons: React.FC<Props> = ({player}) => {
  return (
      <>
          <VolumeUp style={[{marginEnd: 10}]} player={player} />
          <VolumeOff style={[{marginEnd: 10}]} player={player} />
          <VolumeDown style={[{marginEnd: 10}]} player={player} />
      </>
  );
};

export default VolumeButtons;
