import React, { FunctionComponent, Fragment } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS, FONT, PADDING, RADIUS } from '../constants';
import TouchableOpacity from '../TouchableOpacity';
import { iAttribute, iUnit } from '../types/furniture';
import Selector from './Selector';

interface iAttributeProps extends iAttribute {
  nativeKey: string;
  active: iUnit | null;
  activeAttribute: string | null;
  onAttributeToggle: (key: string) => void;
  onSelect: (attribute: string, material: string) => void;
}

const Attribute: FunctionComponent<iAttributeProps> = ({
  id,
  name,
  nativeKey,
  active,
  onAttributeToggle,
  materialUnitsExtended,
  onSelect,
  disabled,
}) => {
  const isActive = true; //activeAttribute === nativeKey;
  const _handleToggle = () => onAttributeToggle(nativeKey);
  const _handleSelect = (material: string) => onSelect(id, material);
  if (disabled) return null;
  const units = materialUnitsExtended;

  return (
    <Fragment>
      <TouchableOpacity onPress={_handleToggle}>
        <Animated.View style={[styles.wrapper, isActive && styles.active]}>
          <Text numberOfLines={1} style={[styles.label, isActive && styles.labelActive]}>
            {name}
            {active && ': '}
            {active?.name || units.find((unit) => unit.id.split('-')[0] === active?.id.split('-')[0])?.name}
          </Text>
        </Animated.View>
      </TouchableOpacity>
      <Selector onSelect={_handleSelect} open={isActive} units={units} active={active} />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    borderRadius: RADIUS,
    borderWidth: 1,
    borderColor: COLORS.GRANITE,
    marginBottom: PADDING / 2,
    flexDirection: 'row',
    marginHorizontal: PADDING,
  },
  interactionWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: FONT.CONTENT,
    color: COLORS.GRANITE,
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.35,
    paddingHorizontal: PADDING,
  },
  active: {
    backgroundColor: COLORS.GRANITE,
  },
  labelActive: {
    color: COLORS.WHITE,
  },
});

export default Attribute;
