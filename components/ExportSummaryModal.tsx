import React from 'react';
import Realm from 'realm';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView
} from 'react-native';
import { Button, IconButton, Text, useTheme } from 'react-native-paper';
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
        <View style={[styles.overlay, {backgroundColor: theme.colors.backdrop} ]} >
          <View style={[styles.modalContainer, {backgroundColor: theme.colors.surfaceVariant}] }>

            <IconButton
              icon="close"
              accessibilityLabel="Close modal"
              onPress={onDismiss}
              style={styles.closeButton}
            />
            <View style={styles.header}>
              <Text variant='headlineLarge' accessibilityRole="header">
                Copied to clipboard!
              </Text>
            </View>

            <ScrollView
              style={[styles.printView, {backgroundColor: theme.colors.surfaceDisabled}] }
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
              showsVerticalScrollIndicator={false}
            >
              <Text onStartShouldSetResponder={() => true} style={styles.json}>{jsonString}</Text>
            </ScrollView>

            <View style={styles.questionContainer}>
              <Text variant='titleMedium'>Would you like to add an AI-friendly prompt to this?</Text>
              <View style={styles.buttonsContainer}>
                <Button onPress={onAddPrompt} style={styles.button} mode='contained'>Add Prompt</Button>
                <Button onPress={onConfirmJson} style={styles.button} mode='contained'>Keep as is</Button>
              </View>
            </View>

          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: '5%',
    marginTop: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  json : {
    padding: 16,
  },
  modalContainer: {
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  printView : {
    height: '20%',
    margin: 16,
    borderRadius: 8,
  },
  questionContainer: {
    margin: 16,
  }
});
