import React, { FunctionComponent } from 'react';
import TouchableBase from './TouchableBase';

import { useMemoOne } from 'use-memo-one';
import { Value } from 'react-native-reanimated';

interface iTouchableWithoutFeedbackProps {
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  style?: any;
}

const DURATION = 80;

const TouchableWithoutFeedback: FunctionComponent<iTouchableWithoutFeedbackProps> = ({
  children,
  disabled,
  onPress,
  onLongPress,
  style,
}) => {
  const transition = useMemoOne(() => new Value(0), []);
  return (
    <TouchableBase
      duration={DURATION}
      transition={transition}
      style={style}
      onPress={disabled ? () => {} : onPress}
      onLongPress={onLongPress}
    >
      {children}
    </TouchableBase>
  );
};

export default TouchableWithoutFeedback;
