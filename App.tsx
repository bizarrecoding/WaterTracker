import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from './src/services/i18n';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false, title: i18n.t('home') }} 
          />
          <Stack.Screen 
              name="History" 
              component={HistoryScreen} 
              options={{ 
                  headerShown: true,
                  headerBackTitle: i18n.t('back'),
                  title: i18n.t('history'),
              }} 
          />
          <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{ 
                  headerShown: true,
                  presentation: 'modal', 
                  title: i18n.t('settings'),
              }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
