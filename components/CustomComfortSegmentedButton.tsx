import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';

const COMFORT_LEVELS = [1, 2, 3, 4, 5];

type Props = {
  value?: number;
  onChange?: () => void;
};

export default function ComfortSegmentedControl({ value, onChange }: Props) {
  const [selected, setSelected] = useState<number>(value);

  const handleSelect = (val: number) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.label}>comfort</Text>
      <View style={styles.buttonRow}>
        {COMFORT_LEVELS.map((level) => (
          <Button
            key={level}
            mode={selected === level ? 'contained' : 'outlined'}
            // onPress={() => handleSelect(level)}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            compact
          >
            {level}
          </Button>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  label: {
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    width: 48,
    borderRadius: 12,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
