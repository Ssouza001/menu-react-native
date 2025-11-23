import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Snackbar({ message }) {
  if (!message) return null;

  return (
    <View style={styles.snackbar} pointerEvents="none">
      <Text style={styles.snackbarText}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    zIndex: 1000,
  },
  snackbarText: { color: '#fff' },
});
