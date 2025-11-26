import { Linking, Platform, Animated, Easing } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

export default function HomeScreen({ navigation }) {
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState(null);

  const waveAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setUserName(user.fullName || "User");
        setUserId(user.id);
      }
    };
    loadUser();

    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: -1,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header Box */}
      <View style={styles.headerBox}>
        <View style={styles.headerText}>
          <View style={styles.welcomeRow}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <TouchableOpacity
  style={styles.profileIcon}
  onPress={() => navigation.navigate("ProfileScreen")}
>
  <Image
  source={require("../../assets/profile.png")}
  style={styles.profileImage}
/>
</TouchableOpacity>
          </View>
          <View style={styles.userRow}>
            <Text style={styles.userName}>{userName}</Text>
            <Animated.Text
              style={{
                fontSize: 22,
                marginLeft: 6,
                transform: [
                  {
                    rotate: waveAnim.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: ["-20deg", "0deg", "20deg"],
                    }),
                  },
                ],
              }}
            >
              👋
            </Animated.Text>
          </View>
          <Text style={styles.subtitle}>How can we help you today?</Text>
        </View>
      </View>

      {/* Enter Symptoms Button */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate("EnterSymptoms")}
      >
        <Text style={styles.primaryButtonText}>Enter Symptoms</Text>
      </TouchableOpacity>

      {/* Emergency Button */}
      <TouchableOpacity
        style={styles.emergencyButton}
        onPress={() => {
          const phoneNumber = Platform.OS === "android" ? "tel:108" : "telprompt:108";
          Linking.openURL(phoneNumber);
        }}
      >
        <Text style={styles.emergencyText}>🚨 Emergency</Text>
      </TouchableOpacity>

      {/* Quick Access Section */}
      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.cardGrid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text style={styles.cardTitle}>🧑‍⚕️ My Profile</Text>
          <Text style={styles.cardSubtitle}>View your details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ReminderScreen")}
        >
          <Text style={styles.cardTitle}>⏰ Set Reminder</Text>
          <Text style={styles.cardSubtitle}>Never miss a health habit</Text>
        </TouchableOpacity>

<TouchableOpacity
          style={styles.card}
          onPress={() =>
            Linking.openURL("https://www.google.com/maps/search/hospitals+near+me")
          }
        >
          <Text style={styles.cardTitle}>📍 Nearby Services</Text>
          <Text style={styles.cardSubtitle}>Hospitals, clinics </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => alert("Lab checkup coming soon!")}
        >
          <Text style={styles.cardTitle}>🧪 Lab Checkup</Text>
          <Text style={styles.cardSubtitle}>Nearby labs & reports</Text>
        </TouchableOpacity>


<TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MedicalRightsScreen")}
        >
          <Text style={styles.cardTitle}>⚖️ Medical Rights</Text>
          <Text style={styles.cardSubtitle}>Know your healthcare rights</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.cardTitle}>⚙️ Settings</Text>
          <Text style={styles.cardSubtitle}>App preferences</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Health Tip */}
      <Text style={styles.sectionTitle}>Daily Health Tip</Text>
      <View style={styles.tipCard}>
        <Text style={styles.tipText}>
          Drink at least 8 glasses of water daily to stay hydrated and healthy.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4FE",
    padding: 20,
  },
  headerBox: {
    marginTop:10,
    borderRadius: 10,
    padding: 16,
  },
  headerText: {
    flex: 1,
  },
  welcomeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileIcon: {
    padding: 6,
    borderRadius: 50,
    backgroundColor: "#E6F4FE",
  },
  profileImage: {
    
  width: 40,
  height: 40,
  borderRadius: 20,
},
  profileEmoji: {
    fontSize: 20,
    
  },
  welcome: {
    fontSize: 16,
    color: "#4A6572",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1D3D47",
  },
  subtitle: {
    fontSize: 14,
    color: "#4A6572",
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: "#1D3D47",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  emergencyButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  emergencyText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D3D47",
    marginVertical: 12,
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    width: "48%",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
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
  tipCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  tipText: {
    fontSize: 14,
    color: "#1D3D47",
  },
});