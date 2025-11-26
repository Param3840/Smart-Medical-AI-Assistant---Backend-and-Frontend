import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const [pushEnabled, setPushEnabled] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const push = await AsyncStorage.getItem("pushEnabled");
      setPushEnabled(push === "true");
    };
    loadSettings();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("pushEnabled", JSON.stringify(pushEnabled));
  }, [pushEnabled]);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      if (pushEnabled) {
        Alert.alert(notification.request.content.title, notification.request.content.body);
      }
    });
    return () => subscription.remove();
  }, [pushEnabled]);

  const handleLogout = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Push Notifications</Text>
        <Switch value={pushEnabled} onValueChange={setPushEnabled} />
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("HelpSupport")}>
        <Text style={styles.cardTitle}>Help & Support</Text>
        <Text style={styles.cardSubtitle}>Get help with the app</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("TermsAndConditions")}>
        <Text style={styles.cardTitle}>Terms & Conditions</Text>
        <Text style={styles.cardSubtitle}>Read our terms</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PrivacyPolicy")}>
        <Text style={styles.cardTitle}>Privacy Policy</Text>
        <Text style={styles.cardSubtitle}>How we protect your data</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>App Version</Text>
        <Text style={styles.cardSubtitle}>v1.0.0</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4FE",
    padding: 20,
  },
  row: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1D3D47",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D3D47",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#4A6572",
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: "#1D3D47",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});