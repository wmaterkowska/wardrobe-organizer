import React from 'react';
import Realm from 'realm';
import {
  Modal,
  View,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { useWardrobeContext } from '../context/WardrobeContext';

type Props = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function AddModal({ visible, onClose, children }: Props) {

  const theme = useTheme();
  const { isSelectMode } = useWardrobeContext()

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      accessible={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, {backgroundColor: theme.colors.surfaceVariant}]}>
            <View style={styles.header}>
              <Text variant={"displaySmall"} accessibilityRole="header">
                {isSelectMode ? 'Add New Outfit' : 'Add New Piece'}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close modal"
                onPress={onClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 12,
  },
  modalContainer: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 20,
  },
});
