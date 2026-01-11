import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import i18n from '../services/i18n';

interface WaterControlsProps {
  onAdd: (amount: number) => void;
}

const PRESETS = [250, 300, 400, 500];

export const WaterControls: React.FC<WaterControlsProps> = ({ onAdd }) => {
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'primary');
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{i18n.t('addWater')}</Text>
      <View style={styles.rowWrap}>
        {PRESETS.map((amount) => {
          const type = amount < 400 ? 'cup' : 'bottle';
          return (
            <TouchableOpacity
              key={amount}
              style={[styles.button, { backgroundColor: primaryColor }]}
              onPress={() => onAdd(amount)}
            >
              <Text style={styles.buttonText}>+{amount}ml{'\n'}{i18n.t(type)}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  rowWrap: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  }, 
  button: {
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
