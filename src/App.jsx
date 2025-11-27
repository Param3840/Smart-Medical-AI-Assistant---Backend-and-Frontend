import React, { useEffect } from "react";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import * as Notifications from "expo-notifications";

// 🔔 Notification handler setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Screens
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import EnterSymptomsScreen from "./screens/EnterSymptomsScreen";
import ResultScreen from "./screens/ResultsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import NearbyHospitalScreen from "./screens/NearbyHospitalScreen";
import MedicalRightsScreen from "./screens/MedicalRightsScreen";
import SetReminderScreen from "./screens/ReminderScreen";
import HelpSupportScreen from "./screens/HelpSupportScreen";
import TermsAndConditionsScreen from "./screens/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Please enable notifications in settings");
      }
    })();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        ...TransitionPresets.SlideFromRightIOS, // ✅ Smooth animation
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EnterSymptoms" component={EnterSymptomsScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="NearbyHospitalScreen" component={NearbyHospitalScreen} />
      <Stack.Screen name="MedicalRightsScreen" component={MedicalRightsScreen} />
      <Stack.Screen name="ReminderScreen" component={SetReminderScreen} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
    </Stack.Navigator>
  );
}