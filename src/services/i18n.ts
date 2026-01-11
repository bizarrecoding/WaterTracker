//import { getLocales } from 'expo-localization';
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
    notificationTitle: "💧 Time to Hydrate!",
    notificationBody: "Keep up with your daily goal. Drink some water now!",
    hydrationStatusTitle: "💧 Hydration Status",
    hydrationStatusBody: "{{current}}ml / {{goal}}ml",
    addWater: "Add Water",
    cup: "Cup",
    bottle: "Bottle",
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
    notificationTitle: "💧 ¡Hora de Hidratarse!",
    notificationBody: "Sigue con tu meta diaria. ¡Bebe un poco de agua ahora!",
    hydrationStatusTitle: "💧 Estado de Hidratación",
    hydrationStatusBody: "{{current}}ml / {{goal}}ml",
    addWater: "Agregar Bebida",
    cup: "Vaso",
    bottle: "Botella",
  }
});

i18n.locale = 'es'//getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

export default i18n;
