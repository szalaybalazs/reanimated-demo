import React, { FunctionComponent } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, { Value, timing, Easing } from 'react-native-reanimated';

interface iTouchableBaseProps {
  activeOpacity?: number;
  transition: Value<number>;
  style: any;
  onPress?: (e: any) => void;
  onLongPress?: (e: any) => void;
  duration?: number;
}

const TouchableBase: FunctionComponent<iTouchableBaseProps> = ({
  children,
  transition,
  onPress = () => {},
  onLongPress = () => {},
  style,
  duration: DURATION = 120,
}) => {
  const _handleTransition = (value: number) => {
    timing(transition, {
      toValue: value,
      duration: DURATION,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };

  const _handlePressIn = () => _handleTransition(1);
  const _handlePressOut = () => _handleTransition(0);

  return (
    <TouchableWithoutFeedback
      onPressIn={_handlePressIn}
      onPressOut={_handlePressOut}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <Animated.View style={style}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default TouchableBase;
