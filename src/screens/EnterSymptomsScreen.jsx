import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { API_URL } from "../config/api";

export default function EnterSymptomsScreen({ navigation }) {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const quickSuggestions = ["Fever", "Headache", "Cough", "Stomach pain", "Body ache"];

  const onChipPress = (chip) => {
    if (!symptoms) {
      setSymptoms(chip);
    } else {
      const next = symptoms.includes(chip) ? symptoms : `${symptoms}, ${chip}`;
      setSymptoms(next);
    }
  };

  const onVoiceInput = () => {
    // Placeholder: integrate voice recognition later
  };

  const onAnalyze = async () => {
    if (!symptoms.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: symptoms }),
      });

      const data = await res.json();
      console.log("Analyze response:", data);

      navigation.navigate("ResultScreen", {
        userInput: symptoms,
        suggestions: data.suggestions,
      });
    } catch (err) {
      console.error("Analyze error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Describe Your Symptoms</Text>
        <Text style={styles.headerSubtitle}>Tell us what you're experiencing</Text>
      </View>

      <View style={styles.promptWrap}>
        <Text style={styles.promptTitle}>What's bothering you?</Text>
        <Text style={styles.promptSubtitle}>
          Be as detailed as possible for better suggestions
        </Text>
      </View>

      <TextInput
        style={styles.inputBox}
        multiline
        placeholder="Example: I have a headache, fever, and sore throat..."
        placeholderTextColor="#6B7C93"
        value={symptoms}
        onChangeText={setSymptoms}
      />

      <View style={styles.chipsRow}>
        {quickSuggestions.map((label) => (
          <TouchableOpacity key={label} style={styles.chip} onPress={() => onChipPress(label)}>
            <Text style={styles.chipText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.analyzeBtn}
          onPress={onAnalyze}
          activeOpacity={0.9}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <>
              <MaterialCommunityIcons name="send" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.analyzeText}>Analyze</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    backgroundColor: "#F7FAFC",
    minHeight: "100%",
  },
  headerCard: {
    marginTop:20,
    backgroundColor: "#1D3D47",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#DCE9FF",
  },
  promptWrap: {
    marginBottom: 10,
  },
  promptTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D3D47",
    marginBottom: 4,
  },
  promptSubtitle: {
    fontSize: 13,
    color: "#4A6572",
  },
  inputBox: {
    minHeight: 120,
    borderWidth: 1,
    borderColor: "#D9E2EC",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 12,
    color: "#1D3D47",
    marginTop: 8,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#CFE3FF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  chipText: {
    color: "#000000ff",
    fontWeight: "700",
    fontSize: 13,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  analyzeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D3D47",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  analyzeText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});