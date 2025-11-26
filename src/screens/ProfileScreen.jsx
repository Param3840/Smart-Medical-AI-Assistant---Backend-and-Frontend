import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    gender: "",
    age: "",
  });

  const navigation = useNavigation();

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem("user");
      console.log("Loaded user:", userData);
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user"); // Optional: clear user session
   navigation.replace("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarWrap}>
        <Image
          source={require("../../assets/profile-placeholder.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.fullName || "Name not found"}</Text>
        <Text style={styles.email}>{user.email || "Email not found"}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Gender</Text>
        <Text style={styles.value}>{user.gender || "Gender not found"}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email || "Email not found"}</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Age</Text>
        <Text style={styles.value}>
          {user.age ? `${user.age} years` : "Age not found"}
        </Text>
      </View>

     

      {/* ✅ Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}> Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 20,
    backgroundColor: "#E6F4FE",
   },
  avatarWrap: {
     alignItems: "center",
      marginBottom: 20
     },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
backgroundColor: "#E6F4FE",    marginTop:40,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#1D3D47" },
  email: { fontSize: 14, color: "#4A6572" },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D9E2EC",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D3D47",
    marginBottom: 4,
  },
  value: { fontSize: 14, color: "#333" },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D3D47",
    marginVertical: 12,
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D9E2EC",
  },
  historyText: { fontSize: 14, color: "#4A6572", marginBottom: 4 },
  historySubText: { fontSize: 13, color: "#7B8A97" },
  logoutButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});