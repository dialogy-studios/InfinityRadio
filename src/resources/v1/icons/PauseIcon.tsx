import Svg, {Path} from 'react-native-svg';
import React from 'react';

interface Props {
  size: number;
  color: string;
}

const PauseIcon: React.FC<Props> = ({size, color}) => {
  return (
    <Svg height={size} viewBox={'0 0 24 24'} width={size} fill={color}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </Svg>
  );
};

export default PauseIcon;
