import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import UserCard from '../UserCard/UserCard';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import { colors, radius } from '../../theme';

// ─── HeroSection defined OUTSIDE UserList ────────────────────────────────────
// Must be a stable top-level component, NOT an inline function, so that
// FlatList's ListHeaderComponent never triggers a remount.
function HeroSection({ totalCount, filteredCount, hasSearch }) {
  return (
    <LinearGradient
      colors={['#3730a3', '#5540f5', '#7c3aed']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      {/* Top row: icon badge + member count chip */}
      <View style={styles.heroTopRow}>
        <View style={styles.heroIconBadge}>
          <Text style={styles.heroIconText}>👥</Text>
        </View>
        <View style={styles.memberChip}>
          <Text style={styles.memberChipText}>
            {totalCount} {totalCount === 1 ? 'Member' : 'Members'}
          </Text>
        </View>
      </View>

      {/* Editorial title */}
      <Text style={styles.heroTitle}>User{'\n'}Directory</Text>
      <Text style={styles.heroSubtitle}>
        Browse and search community profiles
      </Text>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{totalCount}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {hasSearch ? filteredCount : totalCount}
          </Text>
          <Text style={styles.statLabel}>Shown</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>
            {totalCount > 0 ? '🟢' : '🔴'}
          </Text>
          <Text style={styles.statLabel}>Live</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

// ─── UserList ────────────────────────────────────────────────────────────────
export default function UserList() {
  const { users, loading, error, search } = useSelector((state) => state.users);
  const [visibleCount, setVisibleCount] = useState(5);
  const insets = useSafeAreaInsets();

  // Memoised filter — only recalculates when users or search changes
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 5);
  }, []);

  // Stable render callbacks — prevents FlatList internal remounts
  const renderItem = useCallback(({ item }) => <UserCard user={item} />, []);
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const renderFooter = useCallback(
    () => (
      <LoadMoreButton
        onPress={handleLoadMore}
        visibleCount={visibleCount}
        totalCount={filteredUsers.length}
      />
    ),
    [handleLoadMore, visibleCount, filteredUsers.length]
  );

  const renderEmpty = useCallback(() => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={colors.primary || '#5540f5'} />
          <Text style={styles.emptyText}>Loading users...</Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.errorIconText}>⚠</Text>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      );
    }
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIconText}>👥</Text>
        <Text style={styles.emptyTitle}>No users found</Text>
        <Text style={styles.emptySubtitle}>
          {search
            ? `No user matches "${search}"`
            : 'No users available in directory.'}
        </Text>
      </View>
    );
  }, [loading, error, search]);

  return (
    <View style={[styles.wrapper, { paddingTop: Math.max(0, insets.top) }]}>

      {/* ── Hero section (no TextInput here — safe inside ListHeaderComponent) ── */}
      <HeroSection
        totalCount={users.length}
        filteredCount={filteredUsers.length}
        hasSearch={search.length > 0}
      />

      {/* ── SearchBar lives OUTSIDE FlatList ─────────────────────────────────
          ROOT CAUSE FIX: TextInput inside ListHeaderComponent is treated as a
          child component by FlatList. When Redux dispatches setSearch(), the
          parent re-renders, renderHeader() produces a new function reference,
          and FlatList unmounts + remounts the entire header — destroying the
          TextInput and collapsing the keyboard after every keystroke.

          By placing SearchBar here as a sibling to FlatList (never inside
          ListHeaderComponent), the TextInput is mounted once and never
          remounted while typing.                                              */}
      <View style={styles.searchContainer}>
        <SearchBar />
      </View>

      {/* ── User FlatList ── */}
      <FlatList
        data={filteredUsers.slice(0, visibleCount)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.appBgStart || '#fbfcff',
  },

  // ── Hero ────────────────────────────────────────────────────────────────
  hero: {
    paddingTop: 20,
    paddingBottom: 22,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  heroIconBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconText: {
    fontSize: 22,
  },
  memberChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  memberChipText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -1,
    lineHeight: 38,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: '500',
    marginBottom: 16,
  },

  // ── Stats Row ────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },

  // ── SearchBar container ──────────────────────────────────────────────────
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
    backgroundColor: colors.appBgStart || '#fbfcff',
  },

  // ── List ─────────────────────────────────────────────────────────────────
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },

  // ── Empty / Error / Loading states ───────────────────────────────────────
  emptyContainer: {
    minHeight: 220,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.emptyBorder || '#d1d8e5',
    borderRadius: radius.card || 16,
    backgroundColor: colors.emptyBg || '#f8fafc',
    padding: 24,
    marginVertical: 10,
  },
  emptyIconText: {
    fontSize: 34,
    marginBottom: 8,
  },
  errorIconText: {
    fontSize: 32,
    marginBottom: 8,
    color: '#f04f5f',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.heading || '#111a2d',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.subtext || '#758197',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: colors.subtext || '#758197',
    marginTop: 10,
  },
});
