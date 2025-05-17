import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'react-native-paper';

type Props = {
  property?: string;
  levels: [];
  value?: number;
  isEditable: boolean;
  onChange?: () => void;
};

export default function CustomSegmentedButton({ property, levels, value, isEditable, onChange }: Props) {
  const [selected, setSelected] = useState<number>(value);

  const handleSelect = (val: number) => {
    setSelected(val);
    onChange?.(val);
  };

  return (
    <View style={styles.container}>
      <Text variant="bodyLarge" style={styles.label}>{property}</Text>
      <View style={styles.buttonRow}>
        {levels.map((level) => (
          <Button
            key={level}
            mode={selected === level ? 'contained' : 'outlined'}
            onPress={isEditable ? () => handleSelect(level) : null}
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
    minWidth: 48,
    borderRadius: 12,
  },
  buttonLabel: {
    fontSize: 16,
  },
});
