import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useWaterStore } from '../store/useWaterStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import i18n from '../services/i18n';
import { useThemeColor } from '../hooks/useThemeColor';

export default function HistoryScreen() {
  const { history } = useWaterStore();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryTextColor = useThemeColor({}, 'textSecondary');

  const historyData = Object.entries(history)
    .sort((a, b) => b[0].localeCompare(a[0])) // Sort descending by date
    .map(([date, amount]) => ({ date, amount }));

  const renderItem = ({ item }: { item: { date: string; amount: number } }) => (
    <View style={[styles.row, { backgroundColor: cardColor }]}>
      <Text style={[styles.date, { color: textColor }]}>{item.date}</Text>
      <Text style={[styles.amount, { color: primaryColor }]}>{item.amount}ml</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: textColor }]}>{i18n.t('history')}</Text>
        {historyData.length === 0 ? (
          <Text style={[styles.empty, { color: secondaryTextColor }]}>{i18n.t('noHistory')}</Text>
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
  container: { flex: 1 },
  content: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  list: { flex: 1 },
  row: {
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
  date: { fontSize: 16, fontWeight: '500' },
  amount: { fontSize: 16, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 }
});
