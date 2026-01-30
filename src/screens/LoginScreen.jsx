import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.success) {

        if (!data.user.gender || !data.user.age) {
          console.warn("Missing gender or age in login response:", data.user);
        }


        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        console.log("Saved user after login:", data.user);

        Alert.alert("Success", "Login successful");

        navigation.replace("Home");
      } else {
        Alert.alert("Error", data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      Alert.alert("Error", "Network error. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/heart.png")} style={styles.icon} />
      <Text style={styles.appName}>Smart Medical Assistance</Text>
      <Text style={styles.tagline}>Your Health, Our Priority</Text>
      <Text style={styles.welcome}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          style={styles.signupLink}
          onPress={() => navigation.navigate("Signup")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F4FE",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1D3D47",
  },
  tagline: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#000",              
  },
  loginButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: "#333",
  },
  signupLink: {
    color: "#1D3D47",
    fontWeight: "bold",
  },
});