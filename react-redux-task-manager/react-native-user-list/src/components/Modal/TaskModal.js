import React, { useState, useEffect } from "react";
import {
  Modal as RNModal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../../redux/tasksSlice";
import { colors, spacing, radius, typography, shadows } from "../../theme";

export default function TaskModal({ isOpen, onClose, editData }) {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const isMobile = width < 760;

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");

  // Sync state whenever editData or isOpen changes
  useEffect(() => {
    if (editData) {
      setTitle(editData.title);
      setPriority(editData.priority);
    } else {
      setTitle("");
      setPriority("medium");
    }
  }, [editData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (editData) {
      dispatch(
        editTask({
          id: editData.id,
          title: title.trim(),
          priority,
        })
      );
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          title: title.trim(),
          priority,
          completed: false,
        })
      );
    }

    onClose();
  };

  const priorityOptions = [
    { key: "high", label: "High" },
    { key: "medium", label: "Medium" },
    { key: "low", label: "Low" },
  ];

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackdrop}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.avoidingView}
          >
            <TouchableWithoutFeedback>
              <View style={[styles.modalBox, shadows.modal]}>
                {/* Modal Header */}
                <View style={styles.modalHead}>
                  <Text style={styles.modalHeadTitle}>
                    {editData ? "Edit Task" : "Add New Task"}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.closeBtnText}>×</Text>
                  </TouchableOpacity>
                </View>

                {/* Form Fields */}
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Task title</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="e.g. Finish React coding test"
                    placeholderTextColor={colors.subtext}
                    autoFocus
                  />
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>Priority</Text>
                  <View style={styles.prioritySelectorContainer}>
                    {priorityOptions.map((opt) => {
                      const isSelected = priority === opt.key;
                      let activeStyle = styles.priorityBtnMediumActive;
                      if (opt.key === "high") activeStyle = styles.priorityBtnHighActive;
                      if (opt.key === "low") activeStyle = styles.priorityBtnLowActive;

                      return (
                        <TouchableOpacity
                          key={opt.key}
                          activeOpacity={0.8}
                          onPress={() => setPriority(opt.key)}
                          style={[
                            styles.priorityOptionBtn,
                            isSelected && activeStyle,
                          ]}
                        >
                          <Text
                            style={[
                              styles.priorityOptionText,
                              isSelected && styles.priorityOptionTextActive,
                            ]}
                          >
                            {opt.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Modal Actions */}
                <View
                  style={[
                    styles.modalActions,
                    isMobile && styles.modalActionsMobile,
                  ]}
                >
                  <TouchableOpacity
                    style={[
                      styles.btnSecondary,
                      isMobile && styles.btnFullWidth,
                    ]}
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.btnSecondaryText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btnPrimary,
                      isMobile && styles.btnFullWidth,
                    ]}
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.btnPrimaryText}>
                      {editData ? "Save Changes" : "Add Task"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.modalOverlay, // Web: rgba(11,17,33,.45)
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  avoidingView: {
    width: "100%",
    maxWidth: 520, // Web: width: min(520px,100%)
    alignItems: "center",
  },
  modalBox: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: radius.modal,
    padding: spacing.modalPadding,
  },
  modalHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.modalHeadMarginB,
  },
  modalHeadTitle: {
    fontSize: typography.modalTitle,
    fontWeight: typography.bold,
    color: colors.modalHeading,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnText: {
    color: colors.modalClose, // Web: #657087
    fontSize: 22,
    lineHeight: 24,
  },
  field: {
    marginBottom: spacing.fieldMarginB,
  },
  fieldLabel: {
    fontSize: typography.label,
    fontWeight: typography.extrabold,
    color: colors.fieldLabel,
    marginBottom: spacing.labelMarginB,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: 13,
    backgroundColor: colors.inputBg,
    fontSize: typography.body,
    color: colors.heading,
  },
  prioritySelectorContainer: {
    flexDirection: "row",
    gap: 8,
  },
  priorityOptionBtn: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.inputBg,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityOptionText: {
    fontSize: typography.small,
    fontWeight: typography.bold,
    color: colors.filterText,
  },
  priorityOptionTextActive: {
    fontWeight: typography.extrabold,
  },
  priorityBtnHighActive: {
    backgroundColor: colors.priorityHighBg,
    borderColor: colors.priorityHighBorder,
  },
  priorityBtnMediumActive: {
    backgroundColor: colors.priorityMediumBg,
    borderColor: colors.priorityMediumBorder,
  },
  priorityBtnLowActive: {
    backgroundColor: colors.priorityLowBg,
    borderColor: colors.priorityLowBorder,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.modalActionsGap,
    marginTop: spacing.modalActionsMarginT,
  },
  modalActionsMobile: {
    flexDirection: "column-reverse", // Web CSS: flex-direction: column-reverse
  },
  btnSecondary: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSecondaryText: {
    color: colors.cancelText,
    fontSize: typography.small,
    fontWeight: typography.extrabold,
  },
  btnPrimary: {
    height: 46,
    paddingHorizontal: 16,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimaryText: {
    color: colors.white,
    fontSize: typography.small,
    fontWeight: typography.extrabold,
  },
  btnFullWidth: {
    width: "100%",
  },
});
