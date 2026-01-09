import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

const i18n = new I18n({
  en: {
    home: 'Home',
    history: 'History',
    settings: 'Settings',
    hydrationTracker: 'Hydration Tracker',
    goal: 'Goal:',
    viewHistory: 'View History',
    noHistory: 'No history yet.',
    dailyGoal: 'Daily Goal (ml)',
    enableNotifications: 'Enable Notifications',
    saveGoal: 'Save Goal',
    resetProgress: "Reset Today's Progress",
    resetConfirmTitle: "Reset Today's Progress",
    resetConfirmMessage: "Are you sure you want to reset your water intake for today?",
    cancel: "Cancel",
    reset: "Reset",
    success: "Success",
    dailyGoalUpdated: "Daily goal updated",
    invalidGoal: "Invalid Goal",
    invalidGoalMessage: "Please enter a valid number greater than 0",
    back: "Back",
  },
  es: {
    home: 'Inicio',
    history: 'Historial',
    settings: 'Configuración',
    hydrationTracker: 'Rastreador de Hidratación',
    goal: 'Meta:',
    viewHistory: 'Ver Historial',
    noHistory: 'Aún no hay historial.',
    dailyGoal: 'Meta Diaria (ml)',
    enableNotifications: 'Activar Notificaciones',
    saveGoal: 'Guardar Meta',
    resetProgress: "Reiniciar Progreso de Hoy",
    resetConfirmTitle: "Reiniciar Progreso de Hoy",
    resetConfirmMessage: "¿Estás seguro de que quieres reiniciar tu consumo de agua para hoy?",
    cancel: "Cancelar",
    reset: "Reiniciar",
    success: "Éxito",
    dailyGoalUpdated: "Meta diaria actualizada",
    invalidGoal: "Meta Inválida",
    invalidGoalMessage: "Por favor ingresa un número válido mayor a 0",
    back: "Atrás",
  }
});

i18n.locale = getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export default i18n;
