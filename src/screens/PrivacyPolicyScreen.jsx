import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Privacy Policy</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our app.
      </Text>

      <Text style={styles.sectionTitle}>2. Data We Collect</Text>
      <Text style={styles.text}>
        We may collect basic information such as your name, email address, and usage data to improve your experience. We do not collect sensitive personal data without your consent.
      </Text>

      <Text style={styles.sectionTitle}>3. How We Use Your Data</Text>
      <Text style={styles.text}>
        Your data is used to personalize your experience, send notifications (if enabled), and improve app features. We do not sell or share your data with third parties.
      </Text>

      <Text style={styles.sectionTitle}>4. Data Security</Text>
      <Text style={styles.text}>
        We implement security measures to protect your data from unauthorized access. However, no method of transmission over the internet is 100% secure.
      </Text>

      <Text style={styles.sectionTitle}>5. Your Rights</Text>
      <Text style={styles.text}>
        You can request to view, update, or delete your personal data at any time by contacting us at paramveersingh240303@gmail.com.
      </Text>

      <Text style={styles.sectionTitle}>6. Changes to This Policy</Text>
      <Text style={styles.text}>
        We may update this Privacy Policy as our app evolves. We encourage you to review this page periodically for any changes.
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#1D3D47",
    marginTop:20,
    // marginBottom: 10,
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
  },
});