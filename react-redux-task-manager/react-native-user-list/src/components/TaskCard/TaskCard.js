import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../../redux/tasksSlice";
import { colors, spacing, radius, typography, shadows } from "../../theme";

export default function TaskCard({ task, onEditPress }) {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const isMobile = width < 768; // Matching CSS responsive breakpoint

  const priorityLabel = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  // Pick priority styles
  let priorityStyle = styles.priorityLow;
  let priorityTextStyle = styles.priorityLowText;
  if (task.priority === "high") {
    priorityStyle = styles.priorityHigh;
    priorityTextStyle = styles.priorityHighText;
  } else if (task.priority === "medium") {
    priorityStyle = styles.priorityMedium;
    priorityTextStyle = styles.priorityMediumText;
  }

  return (
    <View
      style={[
        styles.card,
        shadows.card,
        task.completed && styles.cardCompleted,
        isMobile && styles.cardMobile,
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity
        style={[styles.checkbox, task.completed && styles.checkboxCompleted]}
        onPress={() => dispatch(toggleTask(task.id))}
        activeOpacity={0.8}
      >
        {task.completed && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>

      {/* Main Info */}
      <View style={styles.taskMain}>
        <Text
          style={[styles.title, task.completed && styles.titleCompleted]}
          numberOfLines={isMobile ? 0 : 1}
        >
          {task.title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>Today</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.metaText}>
            {task.completed ? "Completed" : "Open"}
          </Text>
        </View>
      </View>

      {/* Priority Badge */}
      <View
        style={[
          styles.priorityBadge,
          priorityStyle,
          isMobile && styles.priorityBadgeMobile,
        ]}
      >
        <Text style={[styles.priorityText, priorityTextStyle]}>
          {priorityLabel}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={[styles.actions, isMobile && styles.actionsMobile]}>
        <TouchableOpacity
          style={[styles.iconBtn, styles.editBtn]}
          onPress={() => onEditPress(task)}
          activeOpacity={0.7}
        >
          <Text style={styles.editIconText}>✎</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.iconBtn, styles.deleteBtn]}
          onPress={() => dispatch(deleteTask(task.id))}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteIconText}>⌫</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    minHeight: 104,
    paddingVertical: spacing.cardPaddingV,
    paddingHorizontal: spacing.cardPaddingH,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.cardGap,
  },
  cardCompleted: {
    // Keeps card bg white, but text components change styles
  },
  cardMobile: {
    alignItems: "flex-start",
    flexWrap: "wrap",
    padding: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.checkbox,
    borderWidth: 2,
    borderColor: colors.checkboxBorder,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxCompleted: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkmark: {
    color: colors.white,
    fontSize: 12,
    fontWeight: typography.bold,
  },
  taskMain: {
    flex: 1,
    minWidth: 100, // ensure title doesn't crush
  },
  title: {
    fontSize: typography.taskTitle,
    fontWeight: typography.extrabold,
    color: colors.taskTitle,
  },
  titleCompleted: {
    color: colors.taskDone,
    textDecorationLine: "line-through",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.metaGap,
    marginTop: spacing.metaMarginT,
  },
  metaText: {
    color: colors.metaText,
    fontSize: typography.xs,
  },
  dot: {
    color: colors.metaText,
    opacity: 0.55,
  },
  priorityBadge: {
    minWidth: 82,
    height: 38,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  priorityBadgeMobile: {
    marginLeft: 40, // Match web CSS responsive layout rule: .priority { margin-left: 40px; }
  },
  priorityText: {
    fontSize: typography.xs,
    fontWeight: typography.black,
  },
  priorityHigh: {
    backgroundColor: colors.priorityHighBg,
    borderColor: colors.priorityHighBorder,
  },
  priorityHighText: {
    color: colors.priorityHighText,
  },
  priorityMedium: {
    backgroundColor: colors.priorityMediumBg,
    borderColor: colors.priorityMediumBorder,
  },
  priorityMediumText: {
    color: colors.priorityMediumText,
  },
  priorityLow: {
    backgroundColor: colors.priorityLowBg,
    borderColor: colors.priorityLowBorder,
  },
  priorityLowText: {
    color: colors.priorityLowText,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.actionsGap,
  },
  actionsMobile: {
    marginLeft: "auto",
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtn: {},
  deleteBtn: {},
  editIconText: {
    color: colors.editIcon, // Web: #5540f5
    fontSize: 17,
  },
  deleteIconText: {
    color: colors.deleteIcon, // Web: #f04f5f
    fontSize: 17,
  },
});
