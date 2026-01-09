import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useWaterStore } from '../store/useWaterStore';
import { ProgressRing } from '../components/ProgressRing';
import { WaterControls } from '../components/WaterControls';
import { registerForPushNotificationsAsync, scheduleHydrationReminder } from '../services/notifications';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../services/i18n';

export default function HomeScreen() {
  const { currentIntake, dailyGoal, addWater, checkDate } = useWaterStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    checkDate();
    registerForPushNotificationsAsync().then(success => {
      if (success) {
        scheduleHydrationReminder();
      }
    });
  }, []);

  const progress = dailyGoal > 0 ? currentIntake / dailyGoal : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{i18n.t('hydrationTracker')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.settingsLink}>⚙️</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <ProgressRing
            radius={120}
            stroke={20}
            progress={progress}
          />
          <View style={styles.statsText}>
            <Text style={styles.current}>{currentIntake}ml</Text>
            <Text style={styles.goal}>{i18n.t('goal')} {dailyGoal}ml</Text>
          </View>
        </View>

        <WaterControls onAdd={addWater} />

        <TouchableOpacity 
            style={styles.historyButton}
            onPress={() => navigation.navigate('History')}
        >
            <Text style={styles.historyButtonText}>{i18n.t('viewHistory')}</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6', 
  },
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827', 
  },
  settingsLink: {
    // position: 'absolute',
      right: -50, // approximate placement
    fontSize: 24,
    // top: -5,
  },
  statsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  statsText: {
    // position: 'absolute',
    alignItems: 'center',
  },
  current: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  goal: {
    fontSize: 14,
    color: '#6b7280', 
    marginTop: 4,
  },
  historyButton: {
    marginTop: 40,
    padding: 16,
  },
  historyButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  }
});
