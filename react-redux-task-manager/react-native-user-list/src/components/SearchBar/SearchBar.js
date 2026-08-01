import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/usersSlice';
import { colors, radius } from '../../theme';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchVal = useSelector((state) => state.users.search);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.searchWrap, isFocused && styles.searchWrapFocused]}>
      <Text style={[styles.searchIcon, isFocused && styles.searchIconFocused]}>
        ⌕
      </Text>
      <TextInput
        style={styles.input}
        value={searchVal}
        placeholder="Search users by name..."
        placeholderTextColor="#a0aab8"
        onChangeText={(text) => dispatch(setSearch(text))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    shadowColor: '#111a2d',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  searchWrapFocused: {
    borderColor: colors.primary || '#5540f5',
    shadowColor: colors.primary || '#5540f5',
    shadowOpacity: 0.15,
    elevation: 5,
  },
  searchIcon: {
    fontSize: 20,
    color: '#a0aab8',
    marginRight: 10,
    lineHeight: 24,
  },
  searchIconFocused: {
    color: colors.primary || '#5540f5',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.heading || '#111a2d',
    fontWeight: '500',
    includeFontPadding: false,
  },
});
