import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function TermsAndConditionsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Terms & Conditions</Text>

      <Text style={styles.sectionTitle}>1. Welcome to Our App</Text>
      <Text style={styles.text}>
        Thank you for choosing our app. This is our first release, and we’re excited to have you on board! By using this app, you agree to the terms mentioned below.
      </Text>

      <Text style={styles.sectionTitle}>2. App Purpose</Text>
      <Text style={styles.text}>
        This app is designed to help users manage their health, access useful tools, and stay informed. It is not a substitute for professional medical advice.
      </Text>

      <Text style={styles.sectionTitle}>3. User Agreement</Text>
      <Text style={styles.text}>
        By using this app, you agree not to misuse any features, share false information, or attempt to harm the app’s functionality or other users.
      </Text>

      <Text style={styles.sectionTitle}>4. Data & Privacy</Text>
      <Text style={styles.text}>
        We respect your privacy. Any data you provide will be handled securely and only used to improve your experience. We do not share your personal data with third parties.
      </Text>

      <Text style={styles.sectionTitle}>5. Updates & Changes</Text>
      <Text style={styles.text}>
        As this is our first version, we may update the app and these terms frequently. We’ll do our best to notify you of major changes.
      </Text>

      <Text style={styles.sectionTitle}>6. Contact Us</Text>
      <Text style={styles.text}>
        For any questions or concerns, feel free to contact us at paramveersingh240303@gmail.com. We’re here to help!
      </Text>

      <Text style={styles.footer}>Last updated: November 26, 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F9FF",
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  heading: {
    marginTop:20,
    fontSize: 26,
    fontWeight: "bold",
    color: "#1D3D47",
    marginBottom: 10,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1D3D47",
    marginTop: 20,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: "#4A6572",
    lineHeight: 22,
  },
  footer: {
    marginTop: 40,
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    bottom:30,
  },
});