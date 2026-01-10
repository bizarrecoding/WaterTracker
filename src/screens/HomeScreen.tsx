import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useWaterStore } from '../store/useWaterStore';
import { ProgressRing } from '../components/ProgressRing';
import { WaterControls } from '../components/WaterControls';
import { registerForPushNotificationsAsync, scheduleHydrationReminder, showHydrationStatusNotification } from '../services/notifications';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../services/i18n';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useThemeColor } from '../hooks/useThemeColor';

export default function HomeScreen() {
  const { currentIntake, dailyGoal, addWater, checkDate } = useWaterStore();
  const navigation = useNavigation<any>();

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const secondaryTextColor = useThemeColor({}, 'textSecondary');
  const primaryColor = useThemeColor({}, 'primary');

  useEffect(() => {
    checkDate();
    // Refresh persistent notification on mount
    showHydrationStatusNotification(currentIntake, dailyGoal);

    registerForPushNotificationsAsync().then(success => {
      if (success) scheduleHydrationReminder();
    });
  }, []);

  const progress = dailyGoal > 0 ? currentIntake / dailyGoal : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>{i18n.t('hydrationTracker')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}
            style={styles.settingsLink}>
            <Ionicons name="settings-outline" size={24} color={textColor} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <ProgressRing
            radius={120}
            stroke={20}
            progress={progress}
          />
          <View style={styles.statsText}>
            <Text style={[styles.current, { color: textColor }]}>{currentIntake}ml</Text>
            <Text style={[styles.goal, { color: secondaryTextColor }]}>{i18n.t('goal')} {dailyGoal}ml</Text>
          </View>
        </View>

        <WaterControls onAdd={addWater} />

        <TouchableOpacity 
          style={styles.historyButton}
          onPress={() => navigation.navigate('History')}
        >
          <Text style={[styles.historyButtonText, { color: primaryColor }]}>{i18n.t('viewHistory')}</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flexGrow: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  settingsLink: { 
    marginLeft: 12,
  },
  statsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statsText: { alignItems: 'center' },
  current: { fontSize: 36, fontWeight: 'bold' },
  goal: { fontSize: 16, marginTop: 4 },
  historyButton: { marginTop: 40, padding: 16 },
  historyButtonText: { fontSize: 16, fontWeight: '600' },
});
