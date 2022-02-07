import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  size: number;
  color: string;
}

const PlayIcon: React.FC<Props> = ({size, color}) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z" />
    </Svg>
  );
};

export default PlayIcon;
