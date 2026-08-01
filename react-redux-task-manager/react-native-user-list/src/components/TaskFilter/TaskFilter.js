import React from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/tasksSlice";
import { colors, spacing, radius, typography } from "../../theme";

export default function TaskFilter() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.tasks.filter);

  const filters = ["all", "high", "medium", "low"];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        const displayLabel = filter.charAt(0).toUpperCase() + filter.slice(1);

        return (
          <TouchableOpacity
            key={filter}
            activeOpacity={0.8}
            onPress={() => dispatch(setFilter(filter))}
            style={[
              styles.filterBtn,
              isActive ? styles.filterBtnActive : styles.filterBtnInactive,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                isActive ? styles.filterTextActive : styles.filterTextInactive,
              ]}
            >
              {displayLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: spacing.filterGap,
    marginBottom: spacing.filterMarginB,
    paddingVertical: 4, // Prevents shadows/borders clipping
  },
  filterBtn: {
    minHeight: 42,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  filterBtnInactive: {
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  filterBtnActive: {
    borderColor: colors.filterActiveBorder,
    backgroundColor: colors.filterActiveBg,
  },
  filterText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    textAlign: "center",
  },
  filterTextInactive: {
    color: colors.filterText,
  },
  filterTextActive: {
    color: colors.filterActiveText,
  },
});
