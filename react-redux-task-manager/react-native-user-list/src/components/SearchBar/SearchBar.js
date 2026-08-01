import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/tasksSlice";
import { colors, spacing, radius, typography, shadows } from "../../theme";

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchVal = useSelector((state) => state.tasks.search);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.searchWrap, shadows.card]}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        style={[
          styles.input,
          isFocused && styles.inputFocused,
        ]}
        value={searchVal}
        placeholder="Search tasks..."
        placeholderTextColor={colors.subtext}
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
    position: "relative",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: radius.input,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: 14,
    color: colors.searchIcon, // Web: #95a0b5
    fontSize: typography.searchIcon, // Web: 20px
    zIndex: 10,
  },
  input: {
    width: "100%",
    height: spacing[52] || 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    backgroundColor: colors.white,
    paddingLeft: 46,
    paddingRight: 16,
    fontSize: typography.body,
    color: colors.heading,
  },
  inputFocused: {
    borderColor: colors.focusBorder,
  },
});
