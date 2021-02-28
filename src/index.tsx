import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { iUnit } from './types/material';
import Attribute from './Attributes/Attribute';
const types = ['type1', 'type2', 'type3', 'type4'];
const getTypes = (): string[] => {
  const _types = [...types];
  const val = [];
  const numOfTypes = Math.floor(Math.random() * types.length);
  for (let i = 0; i < numOfTypes; i++) {
    const index = Math.floor(Math.random() * types.length);
    val.push(_types.splice(index, 1)[0]);
  }

  return val;
};

const units: iUnit[] = new Array(540).fill(null).map((_, index: number) => ({
  color: {
    l: Math.random() * 100,
  },
  name: `Material #${index + 1}`,
  id: `UNIT_${index}`,
  key: `unit-${index}`,
  featured: {
    id: 'FEATURED',
    url:
      'https://www.one4leather.com/storage/app/uploads/public/images/Cotance-calls-on-the-EU-Commission-to-regulate-the-use-of-the-term-leather.jpg',
  },
  types: getTypes(),
}));

const Route = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <Attribute
          nativeKey='TEST'
          materialUnitsExtended={units}
          id='ID'
          name='NAME'
          active={units[0]}
          activeAttribute='NAME'
          onAttributeToggle={() => null}
          onSelect={() => null}
          disabled={false}
          disableds={[]}
        />
      </SafeAreaView>
    </View>
  );
};

export default Route;
