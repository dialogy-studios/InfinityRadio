import React, {useEffect, useState} from 'react';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface Props {
  onStartLongPress?: () => void,
  onEndLongPress?: () => void,
  onLongPressTick?: () => void;
}

const LongPressTouchable: React.FC<Props & TouchableOpacityProps> = props => {
  const [shouldTick, setTick] = useState(false);
  const [longPressTimeout, setLongPressTimeout] =
    useState<NodeJS.Timeout | null>(null);
  const handleLongPress = () => {
    const timeout = setTimeout(() => {
      setTick(true);
      handleLongPress();
    }, 500);
    setLongPressTimeout(timeout);
  };

  useEffect(() => {
    if (shouldTick && props.onLongPressTick) {
      props.onLongPressTick();
    }
  }, [props, shouldTick]);

  return (
    <TouchableOpacity
      {...props}
      onLongPress={() => {
        handleLongPress();
        if (props.onStartLongPress) {
          props.onStartLongPress();
        }
      }}
      onPressOut={() => {
        if (longPressTimeout) {
          clearTimeout(longPressTimeout);
          setTick(false);
        }
        if (props.onEndLongPress) {
          props.onEndLongPress();
        }
      }}>
      {props.children}
    </TouchableOpacity>
  );
};

export default LongPressTouchable;
