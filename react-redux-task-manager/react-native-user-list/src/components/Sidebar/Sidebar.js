import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import sidebarData from "./sidebarData";
import { setFilter } from "../../redux/tasksSlice";
import { colors, spacing, typography, radius } from "../../theme";

export default function Sidebar({ onClose, showCloseButton }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const tasks = useSelector((state) => state.tasks.tasks);
  const activeFilter = useSelector((state) => state.tasks.filter);

  const counts = {
    all: tasks.length,
    today: tasks.length,
    important: tasks.filter((t) => t.priority === "high").length,
    completed: tasks.filter((t) => t.completed).length,
  };

  const handleNavPress = (item) => {
    if (item.label === "All Tasks") {
      dispatch(setFilter("all"));
    } else if (item.label === "Today") {
      dispatch(setFilter("today"));
    } else if (item.label === "Important") {
      dispatch(setFilter("high"));
    } else if (item.label === "Completed") {
      dispatch(setFilter("completed"));
    }

    if (onClose) {
      onClose();
    }
  };

  const paddingTop = Math.max(spacing.sidebarPaddingV, insets.top + 16);

  return (
    <LinearGradient
      colors={[colors.sidebarBgStart, colors.sidebarBgEnd]}
      style={[styles.sidebar, { paddingTop }]}
    >
      {/* Brand Row */}
      <View style={styles.brandRow}>
        <Text style={styles.brandText} numberOfLines={1}>
          Task Manager
        </Text>
        {showCloseButton && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeBtnText}>×</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profile}>
          <LinearGradient
            colors={[colors.avatarBg[0], colors.avatarBg[1]]}
            style={styles.avatar}
          >
            <Text style={styles.avatarLetter}>M</Text>
          </LinearGradient>
          <View style={styles.profileText}>
            <Text style={styles.profileName}>User</Text>
            <Text style={styles.profileSubtitle}>Stay productive</Text>
          </View>
        </View>

        {/* Navigation Items */}
        <View style={styles.nav}>
          {sidebarData.map((item) => {
            const isActive =
              (item.key === "all" && activeFilter === "all") ||
              (item.key === "today" && activeFilter === "today") ||
              (item.key === "important" && activeFilter === "high") ||
              (item.key === "completed" && activeFilter === "completed");

            const NavItemWrapper = isActive ? LinearGradient : View;
            const wrapperProps = isActive
              ? {
                  colors: [colors.navActiveBg[0], colors.navActiveBg[1]],
                  style: [styles.navItem, styles.navItemActive],
                }
              : {
                  style: styles.navItem,
                };

            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleNavPress(item)}
                activeOpacity={0.7}
              >
                <NavItemWrapper {...wrapperProps}>
                  <Text
                    style={[
                      styles.navIconText,
                      isActive && styles.navIconTextActive,
                    ]}
                  >
                    {item.icon}
                  </Text>
                  <Text
                    style={[
                      styles.navLabel,
                      isActive && styles.navLabelActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                  <View style={styles.countBadge}>
                    <Text style={styles.countText}>{counts[item.key]}</Text>
                  </View>
                </NavItemWrapper>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Productivity Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Text style={styles.tipIconText}>▥</Text>
          </View>
          <View style={styles.tipTextContainer}>
            <Text style={styles.tipTitle}>Stay productive!</Text>
            <Text style={styles.tipDesc}>
              You're doing great. Keep moving forward 💪
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: "100%",
    height: "100%",
    paddingBottom: spacing.sidebarPaddingV,
    paddingHorizontal: spacing.sidebarPaddingH,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 36,
    paddingHorizontal: spacing.brandPaddingH,
    paddingBottom: spacing.brandPaddingB,
    borderBottomWidth: 1,
    borderBottomColor: colors.sidebarDivider,
  },
  brandText: {
    color: colors.white,
    fontSize: typography.brand,
    fontWeight: typography.extrabold,
    lineHeight: 32,
    includeFontPadding: false,
    textAlignVertical: "center",
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: radius.menuBtn,
    backgroundColor: colors.menuBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: typography.bold,
    lineHeight: 22,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.profilePaddingV,
    paddingHorizontal: spacing.profilePaddingH,
    borderBottomWidth: 1,
    borderBottomColor: colors.sidebarDivider,
    gap: spacing.profileGap,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: radius.circle,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: {
    color: colors.white,
    fontSize: 18,
    fontWeight: typography.extrabold,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    color: colors.white,
    fontSize: typography.profileName,
    fontWeight: typography.extrabold,
    marginBottom: 2,
  },
  profileSubtitle: {
    color: colors.sidebarMuted,
    fontSize: typography.xs,
  },
  nav: {
    paddingTop: spacing.navPaddingTop,
    gap: spacing.navGap,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.navItemPaddingV,
    paddingHorizontal: spacing.navItemPaddingH,
    borderRadius: radius.navItem,
    gap: spacing.navItemGap,
  },
  navItemActive: {
    // LinearGradient styled above
  },
  navIconText: {
    width: 22,
    textAlign: "center",
    color: colors.sidebarNavText,
    fontSize: 18,
  },
  navIconTextActive: {
    color: colors.white,
  },
  navLabel: {
    flex: 1,
    color: colors.sidebarNavText,
    fontSize: typography.body,
    fontWeight: typography.semibold,
  },
  navLabelActive: {
    color: colors.white,
  },
  countBadge: {
    minWidth: 28,
    height: 28,
    borderRadius: radius.circle,
    backgroundColor: colors.countBadgeBg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  countText: {
    color: colors.white,
    fontSize: typography.xs,
    fontWeight: typography.extrabold,
  },
  tipCard: {
    marginTop: "auto",
    paddingVertical: spacing.tipPadding,
    paddingHorizontal: spacing.tipPadding,
    borderWidth: 1,
    borderColor: colors.tipCardBorder,
    backgroundColor: colors.tipCardBg,
    borderRadius: radius.tipCard,
    flexDirection: "row",
    gap: spacing.tipGap,
    marginTop: 40,
  },
  tipIconContainer: {
    width: 38,
    height: 38,
    borderRadius: radius.sm,
    backgroundColor: colors.tipIconBg,
    alignItems: "center",
    justifyContent: "center",
  },
  tipIconText: {
    color: colors.white,
    fontSize: 18,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    color: colors.white,
    fontSize: typography.label,
    fontWeight: typography.extrabold,
    marginBottom: 4,
  },
  tipDesc: {
    color: colors.sidebarMuted,
    fontSize: typography.xs,
    lineHeight: 16,
  },
});
