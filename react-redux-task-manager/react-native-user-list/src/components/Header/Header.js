import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, typography, radius, shadows } from "../../theme";

export default function Header({ onAddClick }) {
  const { width } = useWindowDimensions();
  const isMobile = width < 760; // Web: @media(max-width:760px)

  return (
    <View style={[styles.container, isMobile && styles.containerMobile]}>
      <View style={styles.heading}>
        <Text style={[styles.title, isMobile && styles.titleMobile]}>
          Today's Tasks
        </Text>
        <Text style={styles.subtitle}>
          Keep your priorities clear and get things done.
        </Text>
      </View>

      <TouchableOpacity
        onPress={onAddClick}
        activeOpacity={0.8}
        style={[styles.buttonWrapper, isMobile && styles.buttonWrapperMobile]}
      >
        <LinearGradient
          colors={[colors.primaryBg[0], colors.primaryBg[1]]}
          style={styles.addBtn}
        >
          <Text style={styles.addBtnText}>+ Add Task</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: spacing.headerGap,
    marginBottom: spacing.headerMarginB,
  },
  containerMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  heading: {
    flex: 1,
  },
  title: {
    fontSize: typography.heading1,
    fontWeight: typography.extrabold,
    color: colors.heading,
    letterSpacing: -1,
  },
  titleMobile: {
    fontSize: typography.heading1Mobile,
    marginLeft: 54, // Accommodates 36px menu icon + 18px margin next to title
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.subtext,
    marginTop: 8,
  },
  buttonWrapper: {
    ...shadows.primaryBtn,
  },
  buttonWrapperMobile: {
    width: "100%",
  },
  addBtn: {
    height: spacing[52] || 52,
    paddingHorizontal: 22,
    borderRadius: radius.input,
    alignItems: "center",
    justifyContent: "center",
  },
  addBtnText: {
    color: colors.white,
    fontWeight: typography.extrabold,
    fontSize: typography.body,
  },
});
