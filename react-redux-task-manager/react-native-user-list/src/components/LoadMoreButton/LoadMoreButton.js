import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, shadows } from '../../theme';

export default function LoadMoreButton({ onPress, visibleCount, totalCount }) {
  if (visibleCount >= totalCount) {
    return null; // All items displayed
  }

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[colors.primaryBg?.[0] || '#5540f5', colors.primaryBg?.[1] || '#4631e8']}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Load More</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 20,
    ...shadows.primaryBtn,
  },
  button: {
    height: 48,
    borderRadius: radius.input || 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
});
