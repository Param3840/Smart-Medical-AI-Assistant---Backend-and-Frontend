import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  TextInput,
} from "react-native";

export default function HelpSupportScreen() {
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleCall = () => {
    Linking.openURL("tel:8287784156");
  };

  const handleEmail = () => {
    Linking.openURL("mailto:paramveersingh240303@gmail.com?subject=App Support");
  };

  const handleFAQs = () => {
    Alert.alert("TESTING APP");
  };

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === "") {
      Alert.alert("Error", "Please enter your feedback.");
      return;
    }
    Alert.alert("Thank You", "Your feedback has been submitted.");
    setFeedback("");
    setShowForm(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <Text style={styles.heading}>Help & Support</Text>

      {/* Contact Us */}
      <View style={styles.card}>
        <Text style={styles.icon}>📞</Text>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.description}>For urgent help, call us directly.</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleCall}>
            <Text style={styles.buttonText}>Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Email Support */}
      <View style={styles.card}>
        <Text style={styles.icon}>📧</Text>
        <Text style={styles.title}>Email Support</Text>
        <Text style={styles.description}>For general queries, email us anytime.</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleEmail}>
            <Text style={styles.buttonText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FAQs */}
      <View style={styles.card}>
        <Text style={styles.icon}>❓</Text>
        <Text style={styles.title}>FAQs</Text>
        <Text style={styles.description}>Check common questions and answers.</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleFAQs}>
            <Text style={styles.buttonText}>FAQs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feedback */}
      <View style={styles.card}>
        <Text style={styles.icon}>💬</Text>
        <Text style={styles.title}>Feedback</Text>
        <Text style={styles.description}>Tell us what you think about the app.</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button} onPress={() => setShowForm(true)}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feedback Form */}
      {showForm && (
        <View style={{ marginTop: 30 }}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Your Feedback</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your feedback here..."
              multiline
              value={feedback}
              onChangeText={setFeedback}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F9FF",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1D3D47",
    marginBottom: 20,
    marginTop:20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
    position: "relative",
  },
  icon: {
    fontSize: 28,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D3D47",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#4A6572",
    marginBottom: 40,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  button: {
    backgroundColor: "#1D3D47",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    bottom:40,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D3D47",
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#1D3D47",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});