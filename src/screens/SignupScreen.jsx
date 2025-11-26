import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";

export default function SignupScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    // ✅ Input validation
    if (!fullName || !age || !gender || !email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (isNaN(age) || Number(age) <= 0) {
      Alert.alert("Error", "Please enter a valid age");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
           fullName,
            age : Number(age),
            gender, email, password }),
      });
      const data = await res.json();
      console.log("Signup response:", data);

      if (data.success) {
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        console.log("Saved user after signup:", data.user);
        Alert.alert("Success", "Signup successful. Please login.");
        navigation.replace("Login");
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }
    } catch (err) {
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E6F4FE" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/heart.png")}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.appName}>Smart Medical Assistance</Text>
            <Text style={styles.tagline}>Your Health, Our Priority</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create Account</Text>

            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={fullName}
              onChangeText={setFullName}
            />

            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
            />

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={gender}
                onValueChange={(v) => setGender(v)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLinkWrap}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginLink}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#E6F4FE",
    
  },
  header: { 
    alignItems: "center",
     marginBottom: 18
     },
  icon: {
    width: 60,
    height: 60,
    marginTop: 30 },
  appName: { fontSize: 20, fontWeight: "700", color: "#1D3D47", textAlign: "center" },
  tagline: { fontSize: 14, color: "#4A6572", marginTop: 4, textAlign: "center" },
  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#1D3D47", marginBottom: 12 },
  label: { fontSize: 13, color: "#2E3A59", marginBottom: 6, marginTop: 6, fontWeight: "600" },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    color: "#1D3D47",
    marginBottom: 6,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#D9E2EC",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 6,
    backgroundColor: "#FFFFFF",
    height: 44,
    justifyContent: "center",
  },
  picker: { height: 50, color: "#1D3D47" },
  signupButton: {
    height: 46,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  signupText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  loginLinkWrap: { alignItems: "center", marginTop: 12 },
  loginLink: { fontSize: 14, color: "#1D3D47", fontWeight: "700" },
});