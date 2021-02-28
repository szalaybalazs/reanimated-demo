import React, { FunctionComponent } from 'react';
import TouchableBase from './TouchableBase';

import { useMemoOne } from 'use-memo-one';
import { Value, interpolate } from 'react-native-reanimated';

interface iTouchableOpacityProps {
  onPress: (e?: any) => void;
  activeOpacity?: number;
  disabled?: boolean;
  style?: any;
}

const DURATION = 80;

const TouchableOpacity: FunctionComponent<iTouchableOpacityProps> = ({
  children,
  disabled,
  onPress,
  activeOpacity = 0.32,
  style,
}) => {
  const transition = useMemoOne(() => new Value(0), []);
  const opacity = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [1, disabled ? 1 : activeOpacity],
  });
  return (
    <TouchableBase
      duration={DURATION}
      transition={transition}
      style={[style, { opacity }]}
      onPress={disabled ? () => {} : onPress}
    >
      {children}
    </TouchableBase>
  );
};

export default TouchableOpacity;
