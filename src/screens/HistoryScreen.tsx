import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useWaterStore } from '../store/useWaterStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../services/i18n';

export default function HistoryScreen() {
  const { history } = useWaterStore();

  const historyData = Object.entries(history)
    .sort((a, b) => b[0].localeCompare(a[0])) // Sort descending by date
    .map(([date, amount]) => ({ date, amount }));

  const renderItem = ({ item }: { item: { date: string; amount: number } }) => (
    <View style={styles.row}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.amount}>{item.amount}ml</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('history')}</Text>
        {historyData.length === 0 ? (
          <Text style={styles.empty}>{i18n.t('noHistory')}</Text>
        ) : (
          <FlatList
            data={historyData}
            renderItem={renderItem}
            keyExtractor={item => item.date}
            style={styles.list}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
  row: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  date: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  amount: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  empty: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
    fontSize: 16,
  }
});
