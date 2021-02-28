import React, { FunctionComponent, useEffect, useState, Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Value, timing, interpolate, Easing } from 'react-native-reanimated';
import { iUnit } from '../types/furniture';
const Materials = React.lazy(() => import('./Materials'));
import Header from './Header';
import { useMemoOne } from 'use-memo-one';
import { FlingGestureHandler, Directions, State } from 'react-native-gesture-handler';

interface iTypeSelectorProps {
  units: iUnit[];
  active: iUnit | null;
  onSelect: (material: string) => void;
}

interface iTypeProps extends iTypeSelectorProps {
  type: string;
  index: number;
  visible: boolean;
  transition: Value<number>;
}

const TypeSelector: FunctionComponent<iTypeSelectorProps> = ({ units, onSelect, active }) => {
  const types = [
    ...new Set(['favorites', ...units.reduce((unitTypes: string[], unit: iUnit) => unitTypes.concat(unit.types), [])]),
  ];
  const transition = useMemoOne(() => new Value<number>(types.indexOf(active?.types?.[0] || '') || 0), []);
  const [index, setIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const _handleIndex = (typeIndex: number) => {
    setPrevIndex(index);
    setIndex(typeIndex);
  };
  useEffect(() => {
    if (types[index]) {
      timing(transition, {
        toValue: index,
        duration: 320,
        easing: Easing.inOut(Easing.sin),
      }).start(() => setPrevIndex(null));
    }
  }, [index]);

  useEffect(() => {
    const newIndex = types.indexOf(active?.types?.[0] || '');
    if (types[newIndex]) {
      setIndex(newIndex);
      requestAnimationFrame(() => {
        transition.setValue(newIndex);
      });
    }
  }, [active]);

  const _handleHandlerState = (direction: number) => ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.ACTIVE) _handleIndex(Math.min(types.length - 1, Math.max(0, index + direction)));
  };

  return (
    <FlingGestureHandler direction={Directions.RIGHT} onHandlerStateChange={_handleHandlerState(-1)}>
      <FlingGestureHandler direction={Directions.LEFT} onHandlerStateChange={_handleHandlerState(1)}>
        <Animated.View>
          <Header types={types} transition={transition} setIndex={_handleIndex} />
          <View style={styles.typesWrapper}>
            {types.map((type: string, i: number) => (
              <Type
                type={type}
                key={type}
                units={units}
                index={i}
                visible={[index, prevIndex].includes(i)}
                active={active}
                onSelect={onSelect}
                transition={transition}
              />
            ))}
          </View>
        </Animated.View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

const Type: FunctionComponent<iTypeProps> = ({ units, type, index, transition, visible, ...props }) => {
  if (!visible) return null;
  const translateX = interpolate(transition, {
    inputRange: [index - 1, index + 1],
    outputRange: [24, -24],
  });
  const opacity = interpolate(transition, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 0],
  });
  return (
    <Animated.View style={[styles.typeWrapper, { opacity, transform: [{ translateX }] }]}>
      <Suspense fallback={null}>
        <Materials units={units.filter((unit: iUnit) => unit?.types?.includes(type))} {...props} />
      </Suspense>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  typesWrapper: {
    width: '100%',
  },
  typeWrapper: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default TypeSelector;
