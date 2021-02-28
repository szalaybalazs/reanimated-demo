import React, { FunctionComponent, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Value, timing, Easing, multiply } from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import { PADDING, MATERIAL_HEIGHT } from '../constants';
import { iUnit } from '../types/furniture';
import TypeSelector from './TypeSelector';

interface iSelectorProps {
  open: boolean;
  units: iUnit[];
  active: iUnit | null;
  onSelect: (material: string) => void;
}

const Selector: FunctionComponent<iSelectorProps> = ({ open, units, active, onSelect }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const transition = useMemoOne(() => new Value<number>(0), []);
  const targetHeight = 9 * MATERIAL_HEIGHT + 56;
  const height = multiply(targetHeight, transition);
  const marginBottom = multiply(PADDING / 2, transition);

  useEffect(() => {
    if (open) setIsVisible(true);
    requestAnimationFrame(() => {
      timing(transition, {
        toValue: open ? 1 : 0,
        duration: 320,
        easing: Easing.inOut(Easing.sin),
      }).start(() => setIsVisible(open));
    });
  }, [open]);

  if (!isVisible) return null;
  return (
    <Animated.View style={[styles.wrapper, { height, opacity: transition, marginBottom }]}>
      <TypeSelector units={units} active={active} onSelect={onSelect} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
});

export default Selector;
