import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import TaskFilter from "../TaskFilter/TaskFilter";
import TaskList from "../TaskList/TaskList";
import TaskSummary from "../TaskSummary/TaskSummary";
import TaskModal from "../Modal/TaskModal";
import { colors, spacing } from "../../theme";


export default function Dashboard() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const isTablet = width >= 768;
  const isMobile = width < 760;


  const paddingV = isTablet ? (width > 980 ? 42 : 30) : 30;
  const paddingH = isTablet ? (width > 980 ? 44 : 24) : 20;
  const paddingTopMobile = isMobile ? Math.max(70, insets.top + 20) : paddingV;

  const handleAddClick = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEditPress = (task) => {
    setEditData(task);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: paddingTopMobile,
          paddingBottom: paddingV + insets.bottom,
          paddingHorizontal: paddingH,
        },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.content}>
        <Header onAddClick={handleAddClick} />
        <SearchBar />
        <TaskFilter />
        <TaskList onEditPress={handleEditPress} />
        <TaskSummary />

        {/* TaskModal for Add/Edit Task */}
        <TaskModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          editData={editData}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.appBgStart,
  },
  container: {
    flexGrow: 1,
  },
  content: {
    width: "100%",
    maxWidth: 1180, // Web: width: min(1180px, 100%)
    alignSelf: "center",
  },
  placeholderContainer: {
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 15,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    minHeight: 150,
  },
  modalPlaceholder: {
    padding: 20,
    backgroundColor: colors.filterActiveBg,
    borderRadius: 15,
    borderColor: colors.filterActiveBorder,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
  },
  placeholderText: {
    color: colors.subtext,
    fontSize: 14,
    fontWeight: "600",
  },
  closeModalText: {
    color: colors.primary,
    fontWeight: "800",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
