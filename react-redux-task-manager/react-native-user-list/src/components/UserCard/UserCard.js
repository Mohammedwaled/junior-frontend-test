import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '../../theme';

// Unified accent — single indigo gradient for visual consistency
const AVATAR_GRADIENT = ['#5540f5', '#4631e8'];

export default function UserCard({ user }) {
  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <View style={styles.card}>
      {/* Unified indigo left accent bar */}
      <View style={styles.accentBar} />

      <View style={styles.cardInner}>
        {/* Header row */}
        <View style={styles.cardHeader}>
          <LinearGradient
            colors={AVATAR_GRADIENT}
            style={styles.avatar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
          </LinearGradient>

          <View style={styles.nameContainer}>
            {/* Green live status dot */}
            <View style={styles.liveDot} />
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.idChip}>
              <Text style={styles.idChipText}>#{user.id}</Text>
            </View>
          </View>

          {/* Chevron — interactivity cue */}
          <Text style={styles.chevron}>›</Text>
        </View>

        {/* Info rows */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            {/* Darkened for WCAG contrast */}
            <View style={[styles.labelChip, { backgroundColor: '#c7d2fe' }]}>
              <Text style={[styles.labelChipText, { color: '#3730a3' }]}>EMAIL</Text>
            </View>
            <Text style={styles.value} numberOfLines={1}>
              {user.email}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.labelChip, { backgroundColor: '#bbf7d0' }]}>
              <Text style={[styles.labelChipText, { color: '#14532d' }]}>ADDR</Text>
            </View>
            <Text style={styles.valueAddress}>{user.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e8edf5',
    overflow: 'hidden',
    shadowColor: '#111a2d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },
  accentBar: {
    width: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    backgroundColor: '#5540f5', // Unified indigo — no per-card colour cycling
  },
  cardInner: {
    flex: 1,
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f4f9',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e', // Green — matches LIVE stat in hero
    marginRight: 7,
    marginTop: 1,
  },
  userName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
    color: '#111a2d',
    marginRight: 8,
  },
  idChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#f4f6fb',
    borderRadius: 8,
    marginRight: 8,
  },
  idChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7a849a',
    fontVariant: ['tabular-nums'],
  },
  chevron: {
    fontSize: 22,
    fontWeight: '300',
    color: '#c2cad8',
    lineHeight: 26,
  },
  infoSection: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  labelChip: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
    marginTop: 1,
  },
  labelChipText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  value: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#2d3748',
  },
  valueAddress: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: '#2d3748',
    lineHeight: 19,
  },
});
