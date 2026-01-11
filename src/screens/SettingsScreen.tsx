import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Switch } from 'react-native';
import { useWaterStore } from '../store/useWaterStore';
import { useNavigation } from '@react-navigation/native';
import { scheduleHydrationReminder, cancelAllNotifications } from '../services/notifications';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../services/i18n';
import { useThemeColor } from '../hooks/useThemeColor';
import { ThemedButton } from '../components/Buttons';

export default function SettingsScreen() {
  const { dailyGoal, setDailyGoal, resetDaily, notificationsEnabled, toggleNotifications } = useWaterStore();
  const [goalInput, setGoalInput] = useState(dailyGoal.toString());
  const navigation = useNavigation();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const borderColor = useThemeColor({}, 'border');
  const errorColor = useThemeColor({}, 'error');

  const handleSave = () => {
    const newGoal = parseInt(goalInput, 10);
    if (isNaN(newGoal) || newGoal <= 0) {
      Alert.alert(i18n.t('invalidGoal'), i18n.t('invalidGoalMessage'));
      return;
    }
    setDailyGoal(newGoal);
    Alert.alert(i18n.t('success'), i18n.t('dailyGoalUpdated'));
    navigation.goBack();
  };

  const handleToggleNotifications = (value: boolean) => {
    toggleNotifications(value);
    if (value) {
      scheduleHydrationReminder();
    } else {
      cancelAllNotifications();
    }
  };

  const handleReset = () => {
    Alert.alert(
      i18n.t('resetConfirmTitle'),
      i18n.t('resetConfirmMessage'),
      [
        { text: i18n.t('cancel'), style: "cancel" },
        {
          text: i18n.t('reset'), style: "destructive", onPress: () => {
            resetDaily();
            Alert.alert(i18n.t('reset'), "Progress has been reset."); // Re-using reset as title
          }
        }
      ]
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>

        <View style={styles.section}>
          <Text style={[styles.label, { color: textColor }]}>{i18n.t('dailyGoal')}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: cardColor, borderColor, color: textColor }]}
            value={goalInput}
            onChangeText={setGoalInput}
            keyboardType="numeric"
            placeholder="e.g. 2000"
          />
        </View>

        <View style={[styles.section, styles.row]}>
          <Text style={[styles.label, { color: textColor }]}>{i18n.t('enableNotifications')}</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={handleToggleNotifications}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notificationsEnabled ? "#3b82f6" : "#f4f3f4"}
          />
        </View>
        <ThemedButton title={i18n.t('saveGoal')} variant="primary" onPress={handleSave} />

        <ThemedButton title={i18n.t('resetProgress')} variant="error" onPress={handleReset} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  section: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    paddingHorizontal: 12,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
});
