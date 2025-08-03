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
  ScrollView
} from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useWardrobeContext } from '../context/WardrobeContext';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  jsonString: string;
  onAddPrompt: () => void;
  onConfirmJson: () => void;
};

export default function ExportSummaryModal({ visible, onDismiss, jsonString, onAddPrompt, onConfirmJson }: Props) {

  const theme = useTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      accessible={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <View style={[styles.modalContainer, {backgroundColor: theme.colors.surfaceVariant}]}>

            <View style={styles.header}>
              <Text variant={"displaySmall"} accessibilityRole="header">
                Copied to clipboard!
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close modal"
                onPress={onDismiss}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            <ScrollView
              style={styles.printView}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            >
              <Text onStartShouldSetResponder={() => true} style={styles.json}>{jsonString}</Text>
            </ScrollView>

            <View>
              <Text>Would you like to add an AI-friendly prompt to this?</Text>
              <View style={styles.buttonsContainer}>
                <Button onPress={onAddPrompt}>yes</Button>
                <Button onPress={onConfirmJson}>no</Button>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
  },
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
  printView : {
    height: '20%',
    margin: 16,
  },
  json : {

  }
});
