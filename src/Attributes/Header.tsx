import React, { FunctionComponent, useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import Animated, { Value, sub, interpolate, Extrapolate } from 'react-native-reanimated';
import { PADDING, FONT, COLORS, SIDEBAR_RATIO } from '../constants';
import TouchableOpacity from '../TouchableOpacity';

interface iHeaderProps {
  types: string[];
  transition: Value<number>;
  setIndex: (index: number) => void;
}

interface iTypeProps {
  label: string;
  transition: Value<number>;
  index: number;
  onLayout: (width: number) => void;
  onPress: () => void;
}

const sum = (nums: number[]) => nums.reduce((sum, num) => sum + num, 0);

const Header: FunctionComponent<iHeaderProps> = ({ types, transition, setIndex }) => {
  const { width: WIDTH } = useWindowDimensions();
  const width = WIDTH * SIDEBAR_RATIO;
  const [typeWidths, setTypeWidths] = useState<number[]>(new Array(types.length).fill(0));

  const _handleLayout = (index: number) => (width: number) => {
    const _widths = [...typeWidths];
    _widths[index] = width;
    setTypeWidths(_widths);
  };

  const translateX = sub(
    width / 2,
    interpolate(transition, {
      inputRange: [-1, ...types.map((_, index: number) => index)],
      outputRange: [0, ...typeWidths.map((width, index: number) => -width / 2 + sum(typeWidths.slice(0, index + 1)))],
    }),
  );

  const _handleIndex = (index: number) => () => setIndex(index);

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.types, { transform: [{ translateX }] }]}>
        {types.map((type, index: number) => (
          <Type
            onPress={_handleIndex(index)}
            index={index}
            transition={transition}
            key={type}
            label={type}
            onLayout={_handleLayout(index)}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const Type: FunctionComponent<iTypeProps> = ({ label, onLayout, onPress, index, transition }) => {
  const opacity = interpolate(transition, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.6, 1, 0.6],
    extrapolate: Extrapolate.CLAMP,
  });
  const _handleLayout = ({ nativeEvent: { layout } }: any) => onLayout(layout.width);
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.typeWrapper, { opacity }]} onLayout={_handleLayout}>
        <Text style={styles.type}>{label}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 56,
    justifyContent: 'center',
    marginTop: -PADDING / 4,
    marginBottom: PADDING / 4,
    overflow: 'hidden',
  },
  typeWrapper: {
    padding: PADDING / 2,
  },
  types: {
    flexDirection: 'row',
  },
  type: {
    fontSize: 14,
    fontFamily: FONT.CONTENT,
    letterSpacing: 0.35,
    color: COLORS.GRANITE,
    textTransform: 'capitalize',
    fontWeight: '500',
  },
});

export default Header;
