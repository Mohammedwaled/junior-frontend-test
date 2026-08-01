import React from "react";
import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, typography } from "../../theme";

export default function TaskSummary() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <LinearGradient
      colors={[colors.summaryBg[0], colors.summaryBg[1]]}
      style={styles.summary}
    >
      <Text style={styles.summaryText}>
        Great job! You've completed {completedCount} tasks. Keep it up! 🎉
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  summary: {
    marginTop: spacing.summaryMarginT,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.summaryBorder,
    paddingVertical: spacing.summaryPaddingV,
    paddingHorizontal: spacing.summaryPaddingH,
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    color: colors.summaryText,
    fontSize: typography.small,
    fontWeight: typography.bold,
    textAlign: "center",
  },
});
