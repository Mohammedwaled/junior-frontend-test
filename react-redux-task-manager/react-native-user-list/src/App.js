import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
  Animated,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./redux/store";
import { loadTasksFromStorage, fetchTasks } from "./redux/tasksSlice";
import { colors, spacing, radius, typography } from "./theme";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";

function MainApp() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [isHydrated, setIsHydrated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { width } = useWindowDimensions();
  const isTablet = width >= 768; // Matching CSS breakpoint (768px)
  const isDesktop = width > 980; // Matching CSS breakpoint (980px)
  const insets = useSafeAreaInsets();

  // Dynamic sidebar widths matching the web version precisely:
  // Desktop: 310px
  // Tablet: 240px
  // Mobile drawer: 280px
  const sidebarWidth = isTablet ? (isDesktop ? 310 : 240) : 280;

  // Animation values
  const sidebarAnim = useRef(new Animated.Value(0)).current; // 0 = closed, 1 = open

  useEffect(() => {
    // Hydrate state from AsyncStorage on mount
    dispatch(loadTasksFromStorage())
      .unwrap()
      .then((persistedTasks) => {
        if (!persistedTasks || persistedTasks.length === 0) {
          return dispatch(fetchTasks()).unwrap();
        }
      })
      .catch((err) => {
        console.error("Failed to load tasks from storage/API:", err);
      })
      .finally(() => {
        setIsHydrated(true);
      });
  }, [dispatch]);

  // Handle mobile drawer animation
  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: sidebarOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [sidebarOpen, sidebarAnim]);

  // Show a full-screen loading spinner until hydration and initial API loading is complete
  if (!isHydrated) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar style="dark" />
        <View style={styles.contentCentered}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.text}>Loading application...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Calculate animated translations for sidebar and floating toggle button
  const sidebarTranslateX = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  const buttonTranslateX = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sidebarWidth - 55], // Web: calc(var(--sidebar-width) - 55px)
  });

  const backdropOpacity = sidebarAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45], // Web: rgba(11, 17, 33, 0.45)
  });

  return (
    <View style={styles.wrapper}>
      <StatusBar style={sidebarOpen && !isTablet ? "light" : "dark"} />

      {isTablet ? (
        // TABLET/DESKTOP SPLIT LAYOUT
        <View style={styles.tabletLayout}>
          <View style={[styles.tabletSidebarContainer, { width: sidebarWidth }]}>
            <Sidebar showCloseButton={false} />
          </View>
          <View style={styles.mainContent}>
            <Dashboard />
          </View>
        </View>
      ) : (
        // MOBILE OVERLAY LAYOUT
        <View style={styles.mobileLayout}>
          {/* Main Content Area */}
          <View style={styles.mainContent}>
            {/* Floating Hamburger Toggle Button */}
            <Animated.View
              style={[
                styles.toggleButtonContainer,
                {
                  top: Math.max(17, insets.top + 15),
                  transform: [{ translateX: buttonTranslateX }],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setSidebarOpen(!sidebarOpen)}
                activeOpacity={0.8}
              >
                <Text style={styles.toggleButtonText}>
                  {sidebarOpen ? "×" : "☰"}
                </Text>
              </TouchableOpacity>
            </Animated.View>

            <Dashboard />
          </View>

          {/* Backdrop overlay (dismisses sidebar when clicked) */}
          {sidebarOpen && (
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setSidebarOpen(false)}
            >
              <Animated.View
                style={[
                  styles.backdrop,
                  {
                    opacity: backdropOpacity,
                  },
                ]}
              />
            </Pressable>
          )}

          {/* Animated Sidebar Drawer */}
          <Animated.View
            style={[
              styles.animatedSidebar,
              {
                width: sidebarWidth,
                transform: [{ translateX: sidebarTranslateX }],
              },
            ]}
          >
            <Sidebar
              showCloseButton={false}
              onClose={() => setSidebarOpen(false)}
            />
          </Animated.View>
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainApp />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.appBgStart,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.appBgStart,
  },
  contentCentered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    color: colors.subtext,
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  tabletLayout: {
    flex: 1,
    flexDirection: "row",
  },
  tabletSidebarContainer: {
    height: "100%",
  },
  mainContent: {
    flex: 1,
    height: "100%",
  },
  mobileLayout: {
    flex: 1,
    position: "relative",
  },
  toggleButtonContainer: {
    position: "absolute",
    left: 20,
    zIndex: 300,
  },
  toggleButton: {
    width: 36,
    height: 36,
    borderRadius: radius.menuBtn,
    backgroundColor: colors.menuBtn,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleButtonText: {
    color: colors.white,
    fontSize: 22,
    lineHeight: 24,
    fontWeight: typography.bold,
  },
  backdrop: {
    flex: 1,
    backgroundColor: colors.heading, // Fallback base color for backdrop
  },
  animatedSidebar: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 150,
  },
});
