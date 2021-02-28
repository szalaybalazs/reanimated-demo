import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import Animated, { timing, Easing, Value } from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';

const AnimatedFastImage = Animated.createAnimatedComponent(FastImage);

const fallbackLight = { uri: 'https://designshack.net/wp-content/uploads/placeholder-image.png' };

interface iImageProps extends FastImageProps {
  dark?: boolean;
  preventFallback?: boolean;
  animated?: boolean;
}

const Image: FunctionComponent<iImageProps> = ({
  source,
  style,
  resizeMode,
  animated,
  onLoadEnd,
  preventFallback,
  ...props
}) => {
  const mountTime = useRef(Date.now());
  const opacity = useMemoOne(() => new Value<number>(animated ? 0 : 1), []);
  const fallback = fallbackLight;
  const [errored, setErrored] = useState<boolean>(false);

  useEffect(() => {
    mountTime.current = Date.now();
    setErrored(false);
  }, [source]);

  const _handleAppear = () => {
    timing(opacity, {
      duration: Date.now() - mountTime.current < 50 ? 0 : 480,
      easing: Easing.inOut(Easing.sin),
      toValue: 1,
    }).start();
  };

  const _handleError = () => {
    setErrored(true);
    _handleAppear();
    onLoadEnd?.();
  };
  const _handleLoadEnd = () => {
    onLoadEnd?.();
    _handleAppear();
  };

  return (
    <AnimatedFastImage
      {...props}
      style={[style, { opacity }]}
      onError={_handleError}
      onLoadEnd={_handleLoadEnd}
      source={errored && !preventFallback ? fallback : source}
      resizeMode={errored && !preventFallback ? 'cover' : resizeMode}
    />
  );
};

export default Image;
