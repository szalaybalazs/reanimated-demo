import React, { FunctionComponent, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
// import {  } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { COLORS, RADIUS, MATERIAL_HEIGHT, FONT, PADDING } from '../constants';
import { iUnit } from '../types/furniture';
import Material from './Material';

interface iMaterialsProps {
  units: iUnit[];
  active: iUnit | null;
  onSelect: (material: string) => void;
}

const Materials: FunctionComponent<iMaterialsProps> = ({ units, active, onSelect }) => {
  const flatlist = useRef<FlatList<iUnit>>(null);
  const _handleRender = ({ item: unit, index }: { item: iUnit; index: number }) => {
    return (
      <Material
        {...unit}
        active={unit.id.split('-')[0] === active?.id.split('-')[0]}
        last={index === units.length - 1}
        onSelect={onSelect}
      />
    );
  };

  useEffect(() => {
    if (active) {
      const index = units.findIndex((unit: iUnit) => unit.id === active.id);
      setTimeout(() => {
        flatlist.current?.scrollToOffset?.({
          animated: false,
          offset: index * MATERIAL_HEIGHT,
        });
      }, 120);
    }
  }, []);

  const height = Math.min(9, units.length + 2) * MATERIAL_HEIGHT;
  return (
    <Animated.View style={[styles.wrapper, { height }]}>
      {!units.length ? (
        <Empty />
      ) : (
        <FlatList
          scrollEnabled={units.length > 7}
          ref={flatlist}
          showsVerticalScrollIndicator={false}
          // removeClippedSubviews
          // initialNumToRender={9}
          // windowSize={7}
          data={units}
          renderItem={_handleRender}
          keyExtractor={(item: iUnit) => item.id}
          snapToInterval={MATERIAL_HEIGHT}
        />
      )}
    </Animated.View>
  );
};

const Empty: FunctionComponent = () => {
  return (
    <View style={styles.emptyWrapper}>
      <Text style={styles.emptyLabel}>No materials found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS,
    overflow: 'hidden',
    backgroundColor: COLORS.GREY,
    marginHorizontal: PADDING,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyLabel: {
    fontFamily: FONT.CONTENT,
    color: COLORS.CARBON,
    fontWeight: '500',
  },
});

export default Materials;
