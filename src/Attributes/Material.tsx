import React, { FunctionComponent, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, { Value, timing, Easing, add, multiply } from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { MATERIAL_HEIGHT, PADDING, RADIUS, COLORS, FONT } from '../constants';
import { iUnit } from '../types/material';
import TouchableWithoutFeedback from '../TouchableWithoutFeedback';
import Image from '../Image';

interface iMaterialProps extends iUnit {
  last: boolean;
  active: boolean;
  onSelect: (value: string) => void;
  color: any;
}

const Material: FunctionComponent<iMaterialProps> = ({ name, featured, last, active, color, id, onSelect }) => {
  const transition = useMemoOne(() => new Value<number>(active ? 1 : 0), []);
  const opacity = useMemoOne(() => new Value<number>(0), []);
  useEffect(() => {
    timing(transition, {
      duration: 320,
      easing: Easing.inOut(Easing.sin),
      toValue: active ? 1 : 0,
    }).start();
  }, [active]);

  const _handleLoad = () => {
    timing(opacity, {
      duration: 320,
      easing: Easing.inOut(Easing.sin),
      toValue: 1,
    }).start();
  };

  const _handleSelect = () => onSelect?.(id);
  const height = multiply(MATERIAL_HEIGHT, add(1, multiply(transition, 2)));
  const contentHeight = add(height, last ? 0 : PADDING);
  return (
    <TouchableWithoutFeedback onPress={_handleSelect}>
      <Animated.View style={[styles.wrapper, { height, opacity }]}>
        <Animated.View style={[styles.content, { height: contentHeight }]}>
          <View style={styles.labelWrapper}>
            <Text style={[styles.label, color?.l < 50 && styles.light]}>{name || 'Unnamed material'}</Text>
          </View>
          <Image
            dark={color?.l >= 50}
            onLoad={_handleLoad}
            onLoadEnd={_handleLoad}
            style={styles.image}
            source={{ uri: `${featured?.url}@1` }}
            resizeMode='cover'
          />
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: MATERIAL_HEIGHT,
    // ...SHADOWS.SOFT,
  },
  content: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  image: {
    flex: 1,
  },
  labelWrapper: {
    position: 'absolute',
    height: MATERIAL_HEIGHT,
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 12,
  },
  label: {
    fontFamily: FONT.CONTENT,
    fontSize: 16,
    letterSpacing: 0.4,
    color: COLORS.CARBON,
  },
  light: {
    color: COLORS.SILVER,
  },
});

export default Material;
