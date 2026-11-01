import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { COLORS, SPACE, RADIUS } from '../styles/tokens';

export default function SearchBar({
  placeholder = 'Cari entri...',
  onChange,
}) {
  const [queryText, setQueryText] = useState('');

  const handleChange = (text) => {
    setQueryText(text);
    onChange?.(text);
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        value={queryText}
        onChangeText={handleChange}
        placeholder={placeholder}
        style={styles.input}
        accessibilityLabel="Kolom pencarian"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: SPACE.l, // huruf L kecil, bukan angka 1
    paddingVertical: SPACE.m,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.card,
    paddingHorizontal: SPACE.m,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
});