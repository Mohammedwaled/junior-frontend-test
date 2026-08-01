import React from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
import { colors, radius, spacing, typography } from "../../theme";

export default function TaskList({ onEditPress }) {
  const { tasks, loading, error, filter, search } = useSelector(
    (state) => state.tasks
  );

  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.emptyText}>Loading tasks...</Text>
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

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIconText}>📦</Text>
        <Text style={styles.emptyTitle}>No tasks available</Text>
        <Text style={styles.emptySubtitle}>Start by adding a task to your dashboard.</Text>
      </View>
    );
  }

  // Filter tasks sequentially, matching the web implementation precisely
  let filteredTasks = tasks;

  if (search) {
    filteredTasks = filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filter === "high") {
    filteredTasks = filteredTasks.filter((task) => task.priority === "high");
  } else if (filter === "medium") {
    filteredTasks = filteredTasks.filter((task) => task.priority === "medium");
  } else if (filter === "low") {
    filteredTasks = filteredTasks.filter((task) => task.priority === "low");
  } else if (filter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  }

  return (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard task={item} onEditPress={onEditPress} />
      )}
      contentContainerStyle={styles.list}
      scrollEnabled={false} // Nested inside parent ScrollView in Dashboard.js
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.listGap,
    width: "100%",
  },
  emptyContainer: {
    minHeight: 280,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.emptyBorder,
    borderRadius: radius.card,
    backgroundColor: colors.emptyBg,
    padding: 24,
  },
  emptyIconText: {
    fontSize: 34,
    marginBottom: 8,
    color: colors.emptyIcon,
  },
  errorIconText: {
    fontSize: 32,
    marginBottom: 8,
    color: colors.priorityHighText,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: typography.bold,
    color: colors.heading,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: typography.small,
    color: colors.emptyText,
    textAlign: "center",
  },
  emptyText: {
    fontSize: typography.small,
    color: colors.emptyText,
    textAlign: "center",
  },
});
